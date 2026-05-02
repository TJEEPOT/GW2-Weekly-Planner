#!/usr/bin/env python3
"""
check_objectives.py
-------------------
GW2 Build Checker sub-script: detects changes to the Wizard's Vault
objective list.

First run
---------
Fetches the current list of objective IDs from the GW2 API and saves
it to data/objectives.json. Returns ScriptResult.none() — there is
no previous state to compare against yet.

Subsequent runs
---------------
Compares the live API list against the saved one.

  • New objectives  — fetches full details for each new ID and reports
                      them in a single Discord message.
  • Removed objectives — reports the removed IDs in a separate message.
  • No change       — returns ScriptResult.none() silently.

The updated list is always saved over the old one when changes are found.

Exit codes
----------
Always exits 0. Errors are returned as ScriptResult.failure() so the
main checker can forward them to Discord.
"""

import json
import logging
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

SCRIPT_DIR   = Path(__file__).parent
DATA_DIR     = SCRIPT_DIR / "data"
LOG_DIR      = SCRIPT_DIR / "logs"
SAVED_IDS    = DATA_DIR / "objectives.json"

DATA_DIR.mkdir(exist_ok=True)
LOG_DIR.mkdir(exist_ok=True)

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

def _setup_logging() -> logging.Logger:
    """
    Configure a logger that appends to a single persistent log file and
    also writes to stderr (so the parent process can capture it if desired).
    Timestamps are UTC, written in ISO-8601 format so each entry is
    unambiguously dated even as the file accumulates runs over time.
    """
    log_file = LOG_DIR / "check_objectives.log"

    fmt = logging.Formatter(
        fmt="%(asctime)s  %(levelname)-8s  %(message)s",
        datefmt="%Y-%m-%dT%H:%M:%SZ",
    )
    # Force UTC for all log timestamps
    fmt.converter = lambda *_: datetime.now(tz=timezone.utc).timetuple()

    file_handler   = logging.FileHandler(log_file, mode="a", encoding="utf-8")
    file_handler.setFormatter(fmt)

    stream_handler = logging.StreamHandler(sys.stderr)
    stream_handler.setFormatter(fmt)

    logger = logging.getLogger("check_objectives")
    logger.setLevel(logging.DEBUG)
    logger.addHandler(file_handler)
    logger.addHandler(stream_handler)
    return logger


log = _setup_logging()

# ---------------------------------------------------------------------------
# API helpers
# ---------------------------------------------------------------------------

API_BASE = "https://api.guildwars2.com/v2/wizardsvault/objectives"
TIMEOUT  = 15  # seconds


def _get(url: str) -> object:
    """Fetch a URL and return the parsed JSON body."""
    log.debug("GET %s", url)
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "GW2-WizardsVault-ObjectiveChecker/1.0"},
    )
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            raw = resp.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        raise RuntimeError(f"HTTP {exc.code} from {url}: {exc.reason}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Network error fetching {url}: {exc.reason}") from exc

    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Invalid JSON from {url}: {exc}") from exc


def fetch_objective_ids() -> list[int]:
    """Return the full list of current objective IDs from the API."""
    data = _get(API_BASE)
    if not isinstance(data, list):
        raise RuntimeError(f"Expected a JSON array from {API_BASE}, got {type(data)}")
    return sorted(int(i) for i in data)


def fetch_objective_details(ids: list[int]) -> list[dict]:
    """Fetch full details for a list of objective IDs in a single request."""
    if not ids:
        return []
    ids_param = ",".join(str(i) for i in ids)
    url  = f"{API_BASE}?ids={ids_param}"
    data = _get(url)
    if not isinstance(data, list):
        raise RuntimeError(f"Expected a JSON array from the bulk endpoint, got {type(data)}")
    return data


# ---------------------------------------------------------------------------
# Persistence helpers
# ---------------------------------------------------------------------------

def load_saved_ids() -> list[int] | None:
    """
    Return the previously saved objective ID list, or None if no file
    exists yet (i.e. this is the first run).
    """
    if not SAVED_IDS.exists():
        return None
    try:
        data = json.loads(SAVED_IDS.read_text(encoding="utf-8"))
        if not isinstance(data, list):
            raise ValueError("Expected a JSON array")
        return sorted(int(i) for i in data)
    except (json.JSONDecodeError, ValueError) as exc:
        log.warning("Saved objectives file is malformed (%s) — treating as first run.", exc)
        return None


def save_ids(ids: list[int]) -> None:
    """Persist the current objective ID list to disk."""
    SAVED_IDS.write_text(
        json.dumps(sorted(ids), indent=2),
        encoding="utf-8",
    )
    log.info("Saved %d objective IDs to %s", len(ids), SAVED_IDS)


# ---------------------------------------------------------------------------
# Message formatting
# ---------------------------------------------------------------------------

def _format_objective(obj: dict) -> str:
    """Format a single objective dict into a compact readable line."""
    obj_id    = obj.get("id", "?")
    title     = obj.get("title", "Unknown")
    track     = obj.get("track", "?")
    acclaim   = obj.get("acclaim", "?")
    return f"  • [{obj_id}] {title} — {track}, {acclaim} Astral Acclaim"


def build_added_message(new_objectives: list[dict]) -> str:
    """Build the Discord message for newly added objectives."""
    header = (
        f"🆕 **Wizard's Vault: {len(new_objectives)} new objective(s) detected**\n"
    )
    lines = [_format_objective(o) for o in new_objectives]
    return header + "\n".join(lines)


def build_removed_message(removed_ids: list[int]) -> str:
    """Build the Discord message for removed objective IDs."""
    header = (
        f"🗑️ **Wizard's Vault: {len(removed_ids)} objective(s) removed**\n"
        "The following IDs are no longer present in the API:\n"
    )
    lines = [f"  • {i}" for i in removed_ids]
    return header + "\n".join(lines)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    log.info("=== check_objectives started ===")

    # Always import ScriptResult from the same directory as this script
    sys.path.insert(0, str(SCRIPT_DIR))
    from script_result import ScriptResult

    # --- Fetch the current live list ---
    try:
        live_ids = fetch_objective_ids()
    except RuntimeError as exc:
        log.error("Failed to fetch objective IDs: %s", exc)
        result = ScriptResult.failure(
            error=f"Could not fetch Wizard's Vault objective IDs: {exc}",
            metadata={"url": API_BASE},
        )
        print(result.to_json())
        log.info("Returning: failure — %s", exc)
        sys.exit(0)

    log.info("Live objective count: %d", len(live_ids))

    # --- First run: nothing to compare against yet ---
    saved_ids = load_saved_ids()
    if saved_ids is None:
        log.info("No saved objectives found — first run. Saving %d IDs.", len(live_ids))
        save_ids(live_ids)
        result = ScriptResult.none()
        print(result.to_json())
        log.info("Returning: none (first run, baseline saved)")
        sys.exit(0)

    log.info("Saved objective count: %d", len(saved_ids))

    # --- Diff ---
    live_set  = set(live_ids)
    saved_set = set(saved_ids)

    added_ids   = sorted(live_set - saved_set)
    removed_ids = sorted(saved_set - live_set)

    log.info(
        "Diff — added: %d, removed: %d",
        len(added_ids),
        len(removed_ids),
    )

    # --- No change ---
    if not added_ids and not removed_ids:
        result = ScriptResult.none()
        print(result.to_json())
        log.info("Returning: none (no changes detected)")
        sys.exit(0)

    # --- Fetch details for new objectives ---
    messages: list[str] = []

    if added_ids:
        log.info("Fetching details for %d new objective(s): %s", len(added_ids), added_ids)
        try:
            new_objectives = fetch_objective_details(added_ids)
        except RuntimeError as exc:
            log.error("Failed to fetch objective details: %s", exc)
            result = ScriptResult.failure(
                error=f"Detected {len(added_ids)} new objective(s) but could not fetch their details: {exc}",
                metadata={"new_ids": added_ids},
            )
            print(result.to_json())
            log.info("Returning: failure — could not fetch details for new objectives")
            sys.exit(0)

        added_message = build_added_message(new_objectives)
        messages.append(added_message)
        log.info("Built added-objectives message (%d chars)", len(added_message))
        log.debug("Added message:\n%s", added_message)

    if removed_ids:
        removed_message = build_removed_message(removed_ids)
        messages.append(removed_message)
        log.info("Built removed-objectives message (%d chars)", len(removed_message))
        log.debug("Removed message:\n%s", removed_message)

    # --- Persist the new list ---
    save_ids(live_ids)

    # --- Return result ---
    result = ScriptResult.report(
        messages=messages,
        metadata={
            "added_ids":   added_ids,
            "removed_ids": removed_ids,
        },
    )
    print(result.to_json())
    log.info(
        "Returning: report — %d message(s), %d added, %d removed",
        len(messages),
        len(added_ids),
        len(removed_ids),
    )
    log.info("=== check_objectives complete ===")
    sys.exit(0)


if __name__ == "__main__":
    main()
