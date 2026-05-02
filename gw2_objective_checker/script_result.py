"""
script_result.py
----------------
Shared data structure for GW2 Build Checker sub-scripts.

Sub-scripts must write a JSON-serialised ScriptResult to stdout and exit 0.
The main checker script reads this output and acts on it.

STATUS REFERENCE
----------------
  none     — The script ran successfully but found nothing to report.
             Output: {"status": "none"}

  report   — The script has one or more messages to forward to Discord.
             Output: {"status": "report", "messages": ["...", "..."]}

  failure  — The script encountered an error.
             Output: {"status": "failure", "error": "description of what went wrong"}

USAGE IN A SUB-SCRIPT
---------------------
    from script_result import ScriptResult
    import sys

    # Nothing to report
    print(ScriptResult.none().to_json())
    sys.exit(0)

    # Something to report
    result = ScriptResult.report(["Price of Mystic Coins dropped by 20%!"])
    print(result.to_json())
    sys.exit(0)

    # Failure
    result = ScriptResult.failure("Could not reach the trading post API.")
    print(result.to_json())
    sys.exit(0)

PURE JSON (no Python import required)
--------------------------------------
Sub-scripts in other languages just need to print one of these to stdout:

  No change:  {"status": "none"}
  Report:     {"status": "report", "messages": ["line 1", "line 2"]}
  Failure:    {"status": "failure", "error": "what went wrong"}

Empty stdout is also treated as "none" by the main checker.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from enum import Enum


class ScriptStatus(str, Enum):
    NONE = "none"
    REPORT = "report"
    FAILURE = "failure"


@dataclass
class ScriptResult:
    """
    The result returned by a GW2 Build Checker sub-script.

    Attributes
    ----------
    status:
        One of ScriptStatus.NONE, REPORT, or FAILURE.
    messages:
        For REPORT status — a list of strings to send to Discord.
        Each string is sent as a separate message, so keep them under
        2000 characters (Discord's limit). Ignored for other statuses.
    error:
        For FAILURE status — a human-readable description of the error.
        Ignored for other statuses.
    metadata:
        Optional free-form dict for any extra context you want logged
        (not forwarded to Discord). Useful for debugging.
    """

    status: ScriptStatus
    messages: list[str] = field(default_factory=list)
    error: str = ""
    metadata: dict = field(default_factory=dict)

    # ------------------------------------------------------------------
    # Factory constructors
    # ------------------------------------------------------------------

    @classmethod
    def none(cls) -> "ScriptResult":
        """Nothing to report — ran successfully, no changes detected."""
        return cls(status=ScriptStatus.NONE)

    @classmethod
    def report(cls, messages: list[str], metadata: dict | None = None) -> "ScriptResult":
        """
        One or more Discord messages to send.

        Parameters
        ----------
        messages:
            List of message strings. Each will be sent as a separate
            Discord message. Supports Discord markdown.
        metadata:
            Optional debug context (not sent to Discord).
        """
        if not messages:
            raise ValueError("report() requires at least one message.")
        return cls(
            status=ScriptStatus.REPORT,
            messages=messages,
            metadata=metadata or {},
        )

    @classmethod
    def failure(cls, error: str, metadata: dict | None = None) -> "ScriptResult":
        """
        The script encountered an error.

        Parameters
        ----------
        error:
            Human-readable description of what went wrong.
        metadata:
            Optional debug context.
        """
        return cls(
            status=ScriptStatus.FAILURE,
            error=error,
            metadata=metadata or {},
        )

    # ------------------------------------------------------------------
    # Serialisation
    # ------------------------------------------------------------------

    def to_dict(self) -> dict:
        """Serialise to a plain dict (ready for json.dumps)."""
        payload: dict = {"status": self.status.value}
        if self.status == ScriptStatus.REPORT:
            payload["messages"] = self.messages
        if self.status == ScriptStatus.FAILURE:
            payload["error"] = self.error
        if self.metadata:
            payload["metadata"] = self.metadata
        return payload

    def to_json(self, indent: int | None = None) -> str:
        """Serialise to a JSON string."""
        return json.dumps(self.to_dict(), indent=indent)

    @classmethod
    def from_dict(cls, data: dict) -> "ScriptResult":
        """Deserialise from a plain dict."""
        try:
            status = ScriptStatus(data["status"])
        except (KeyError, ValueError) as exc:
            raise ValueError(f"Invalid or missing 'status' field: {exc}") from exc

        return cls(
            status=status,
            messages=data.get("messages", []),
            error=data.get("error", ""),
            metadata=data.get("metadata", {}),
        )

    @classmethod
    def from_json(cls, raw: str) -> "ScriptResult":
        """Deserialise from a JSON string (as produced by a sub-script's stdout)."""
        try:
            data = json.loads(raw)
        except json.JSONDecodeError as exc:
            raise ValueError(f"Sub-script output is not valid JSON: {exc}") from exc
        return cls.from_dict(data)

    # ------------------------------------------------------------------
    # Convenience
    # ------------------------------------------------------------------

    def is_ok(self) -> bool:
        """True if the script did not fail (NONE and REPORT are both 'ok')."""
        return self.status != ScriptStatus.FAILURE

    def __repr__(self) -> str:
        if self.status == ScriptStatus.REPORT:
            return f"ScriptResult(status=report, messages={len(self.messages)})"
        if self.status == ScriptStatus.FAILURE:
            return f"ScriptResult(status=failure, error={self.error!r})"
        return "ScriptResult(status=none)"
