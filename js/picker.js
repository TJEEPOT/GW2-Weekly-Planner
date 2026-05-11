/**
 * js/picker.js — Manual objective selection, persistence, and expiry
 *
 * Manual objectives are stored in localStorage as an array of entries:
 *   [{ id: number, resetType: "daily"|"weekly", resetEpoch: number }, ...]
 *
 * resetEpoch is the UTC timestamp of the reset period that was current when
 * the objective was selected. Expiry is checked by comparing this against
 * the most recent reset for that type:
 *   - Daily:  00:00 UTC each day
 *   - Weekly: 07:30 UTC every Monday
 */

import { META, PRIORITY } from "./meta.js";

/* ── Constants ────────────────────────────────────────────────── */

const DAILY_ACCLAIM  = 10;
const WEEKLY_ACCLAIM = 50;
const STORAGE_KEY    = "gw2_wv_manual_objectives";

/* ── Reset epoch helpers ──────────────────────────────────────── */

/**
 * Returns the UTC timestamp of the most recent daily reset (00:00 UTC)
 * relative to `now`.
 * @param {Date} now
 * @returns {number}
 */
export function getDailyResetEpoch(now = new Date()) {
  const d = new Date(now);
  d.setUTCHours(0, 0, 0, 0);
  return d.getTime();
}

/**
 * Returns the UTC timestamp of the most recent weekly reset
 * (07:30 UTC Monday) relative to `now`.
 * @param {Date} now
 * @returns {number}
 */
export function getWeeklyResetEpoch(now = new Date()) {
  const d = new Date(now);
  d.setUTCHours(0, 0, 0, 0);

  // Rewind to the most recent Monday (UTC day 1)
  const day = d.getUTCDay();                        // 0=Sun … 6=Sat
  const daysBack = day === 0 ? 6 : day - 1;
  d.setUTCDate(d.getUTCDate() - daysBack);
  d.setUTCHours(7, 30, 0, 0);

  // If that Monday 07:30 is still in the future, step back a week
  if (d.getTime() > now.getTime()) {
    d.setUTCDate(d.getUTCDate() - 7);
  }

  return d.getTime();
}

/* ── Persistence ──────────────────────────────────────────────── */

function _load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function _save(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * Replace the stored manual selection with the given entries wholesale.
 * Used by the API loader to persist fetched objectives for page-refresh survival.
 *
 * @param {Array<{id: number, resetType: "daily"|"weekly", resetEpoch: number}>} entries
 */
export function setManualEntries(entries) {
  _save(entries);
}

/* ── Expiry ───────────────────────────────────────────────────── */

/**
 * Remove any stored objectives whose reset period has passed.
 * Saves the pruned list back to localStorage.
 *
 * @param {Date} now
 * @returns {{ removedDaily: number, removedWeekly: number }}
 */
export function pruneExpiredObjectives(now = new Date()) {
  const dailyEpoch  = getDailyResetEpoch(now);
  const weeklyEpoch = getWeeklyResetEpoch(now);
  const stored      = _load();

  const kept = [];
  let removedDaily = 0, removedWeekly = 0;

  for (const entry of stored) {
    if (entry.resetType === "daily" && entry.resetEpoch < dailyEpoch) {
      removedDaily++;
    } else if (entry.resetType === "weekly" && entry.resetEpoch < weeklyEpoch) {
      removedWeekly++;
    } else {
      kept.push(entry);
    }
  }

  if (removedDaily > 0 || removedWeekly > 0) {
    _save(kept);
  }

  return { removedDaily, removedWeekly };
}

/* ── Public state queries ─────────────────────────────────────── */

/** True if there is at least one stored manual objective. */
export function hasManualObjectives() {
  return _load().length > 0;
}

/** Remove all manual objectives from localStorage. */
export function clearAllManualObjectives() {
  _save([]);
}

/**
 * Convert stored manual objectives into API-shaped objects
 * suitable for passing directly to buildSchedule().
 *
 * progress_current starts at 0; progress_complete uses META stage_count.
 *
 * @returns {{ dailyObjs: object[], weeklyObjs: object[] }}
 */
export function getManualObjectiveLists() {
  const stored     = _load();
  const dailyObjs  = [];
  const weeklyObjs = [];

  for (const entry of stored) {
    const meta = META[entry.id];
    if (!meta) continue;

    const obj = {
      id:               entry.id,
      title:            meta.title,
      track:            meta.track,
      acclaim:          meta.acclaim,
      progress_current: 0,
      progress_complete: meta.stage_count ?? 1,
      claimed:          false,
    };

    if (entry.resetType === "daily") dailyObjs.push(obj);
    else                             weeklyObjs.push(obj);
  }

  return { dailyObjs, weeklyObjs };
}

/* ── Catalogue ────────────────────────────────────────────────── */

/**
 * All objectives eligible for manual selection (acclaim 10 or 50),
 * sorted: daily before weekly, then PvE → PvP → WvW, then A→Z.
 */
const CATALOGUE = Object.entries(META)
  .map(([id, meta]) => ({ id: parseInt(id), ...meta }))
  .filter(o => o.acclaim === DAILY_ACCLAIM || o.acclaim === WEEKLY_ACCLAIM)
  .sort((a, b) => {
    if (a.acclaim !== b.acclaim) return a.acclaim - b.acclaim;
    const order = { PvE: 0, PvP: 1, WvW: 2 };
    if ((order[a.track] ?? 9) !== (order[b.track] ?? 9))
      return (order[a.track] ?? 9) - (order[b.track] ?? 9);
    return a.title.localeCompare(b.title);
  });

/* ── Picker UI ────────────────────────────────────────────────── */

let _onClose      = null;
let _selectedIds  = new Set();

/**
 * Initialise the picker modal. Call once during app init.
 * @param {() => void} onClose  Called whenever the picker is closed.
 */
export function initPicker(onClose) {
  _onClose = onClose;

  document.getElementById("pickerClose")
    .addEventListener("click", closePicker);

  document.getElementById("pickerOverlay")
    .addEventListener("click", e => {
      if (e.target === document.getElementById("pickerOverlay")) closePicker();
    });

  document.getElementById("pickerClearAll")
    .addEventListener("click", () => {
      _selectedIds.clear();
      _save([]);
      _renderPickerUI();
    });

  document.getElementById("pickerSearch")
    .addEventListener("input", e => {
      _renderResults(e.target.value.trim().toLowerCase());
    });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" &&
        !document.getElementById("pickerOverlay").classList.contains("hidden")) {
      closePicker();
    }
  });
}

/** Open the picker modal. */
export function openPicker() {
  // Sync internal selection state from localStorage
  _selectedIds = new Set(_load().map(e => e.id));
  document.getElementById("pickerSearch").value = "";
  _renderPickerUI();
  document.getElementById("pickerOverlay").classList.remove("hidden");
  document.getElementById("pickerSearch").focus();
}

/** Close the picker modal and call the onClose callback. */
function closePicker() {
  document.getElementById("pickerOverlay").classList.add("hidden");
  if (_onClose) _onClose();
}

/** Toggle an objective in/out of the selection, saving immediately. */
function _toggle(id) {
  const meta = META[id];
  if (!meta) return;

  const now        = new Date();
  const resetType  = meta.acclaim === DAILY_ACCLAIM ? "daily" : "weekly";
  const resetEpoch = resetType === "daily"
    ? getDailyResetEpoch(now)
    : getWeeklyResetEpoch(now);

  if (_selectedIds.has(id)) {
    _selectedIds.delete(id);
    _save(_load().filter(e => e.id !== id));
  } else {
    _selectedIds.add(id);
    const stored = _load();
    if (!stored.some(e => e.id === id)) {
      stored.push({ id, resetType, resetEpoch });
      _save(stored);
    }
  }

  _renderPickerUI();
}

/* ── Picker render helpers ────────────────────────────────────── */

function _renderPickerUI() {
  _renderChips();
  _renderResults(document.getElementById("pickerSearch").value.trim().toLowerCase());
  _updateCount();
}

function _updateCount() {
  const n = _selectedIds.size;
  document.getElementById("pickerCount").textContent = n;
  document.getElementById("pickerClearAll").style.display = n > 0 ? "" : "none";
}

function _renderChips() {
  const container = document.getElementById("pickerSelectedList");

  if (_selectedIds.size === 0) {
    container.innerHTML =
      `<div class="picker-empty-hint">No objectives selected yet — search below to add some.</div>`;
    return;
  }

  const html = _load().map(entry => {
    const meta = META[entry.id];
    if (!meta) return "";
    const typeCls  = entry.resetType === "daily" ? "badge-daily"  : "badge-weekly";
    const typeLabel = entry.resetType === "daily" ? "Daily"        : "Weekly";
    const trackCls = `badge-track-${meta.track.toLowerCase()}`;
    return `
      <div class="picker-chip">
        <span class="badge ${typeCls}">${typeLabel}</span>
        <span class="badge ${trackCls}">${meta.track}</span>
        <span class="chip-title">${meta.title}</span>
        <button class="chip-remove" data-id="${entry.id}" aria-label="Remove">✕</button>
      </div>`;
  }).join("");

  container.innerHTML = html;

  container.querySelectorAll(".chip-remove").forEach(btn =>
    btn.addEventListener("click", () => _toggle(parseInt(btn.dataset.id)))
  );
}

function _renderResults(query = "") {
  const container = document.getElementById("pickerResults");

  const filtered = query
    ? CATALOGUE.filter(o => o.title.toLowerCase().includes(query))
    : CATALOGUE;

  if (filtered.length === 0) {
    container.innerHTML =
      `<div class="picker-no-results">No objectives match "<em>${query}</em>".</div>`;
    return;
  }

  const daily  = filtered.filter(o => o.acclaim === DAILY_ACCLAIM);
  const weekly = filtered.filter(o => o.acclaim === WEEKLY_ACCLAIM);

  let html = "";
  if (daily.length > 0) {
    html += `<div class="picker-group-label">Daily — ${DAILY_ACCLAIM} Astral Acclaim</div>`;
    html += daily.map(_resultHTML).join("");
  }
  if (weekly.length > 0) {
    html += `<div class="picker-group-label">Weekly — ${WEEKLY_ACCLAIM} Astral Acclaim</div>`;
    html += weekly.map(_resultHTML).join("");
  }

  container.innerHTML = html;

  container.querySelectorAll(".picker-result").forEach(el =>
    el.addEventListener("click", () => _toggle(parseInt(el.dataset.id)))
  );
}

function _resultHTML(o) {
  const sel      = _selectedIds.has(o.id);
  const trackCls = `badge-track-${o.track.toLowerCase()}`;
  return `
    <div class="picker-result${sel ? " selected" : ""}" data-id="${o.id}">
      <span class="badge ${trackCls}">${o.track}</span>
      <span class="result-title">${o.title}</span>
      ${sel ? `<span class="result-check">✓</span>` : ""}
    </div>`;
}
