/**
 * js/main.js - Entry point
 *
 * Manages two modes:
 *   Manual — objectives selected by the user via the picker
 *   API    — objectives loaded from the GW2 API on demand
 *
 * The page never auto-loads from the API on startup. Manual objectives
 * are rendered automatically if present; otherwise the welcome screen
 * is shown. Either way, the user must take an explicit action.
 */

import { fetchAllObjectives }                         from "./api.js";
import { buildSchedule, formatTime }                  from "./scheduler.js";
import { renderOutput, renderLoading, renderError,
         renderWelcome, renderExpiryNotice }           from "./render.js";
import { initDialog, showDialog }                     from "./dialog.js";
import { initPicker, openPicker,
         pruneExpiredObjectives, getManualObjectiveLists,
         hasManualObjectives, clearAllManualObjectives } from "./picker.js";

/* ── DOM refs ─────────────────────────────────────────────────── */

const apiKeyInput  = document.getElementById("apiKey");
const refreshBtn   = document.getElementById("refreshBtn");
const clearBtn     = document.getElementById("clearBtn");
const openPickerBtn = document.getElementById("openPickerBtn");
const tzNote       = document.getElementById("tzNote");
const modeBar      = document.getElementById("modeBar");

/* ── localStorage keys ────────────────────────────────────────── */

const API_KEY_STORAGE = "gw2_wv_apikey";

/* ── Mode bar ─────────────────────────────────────────────────── */

/**
 * Update the mode bar shown beneath the controls.
 * Pass null to hide it (e.g. when in API mode).
 * @param {{ daily: number, weekly: number }|null} counts
 */
function updateModeBar(counts) {
  if (!counts || (counts.daily === 0 && counts.weekly === 0)) {
    modeBar.innerHTML = "";
    modeBar.classList.add("hidden");
    return;
  }
  const parts = [];
  if (counts.daily  > 0) parts.push(`${counts.daily} daily`);
  if (counts.weekly > 0) parts.push(`${counts.weekly} weekly`);
  const total = counts.daily + counts.weekly;
  modeBar.classList.remove("hidden");
  modeBar.innerHTML = `
    <span class="mode-indicator">🎯 Manual mode</span>
    <span class="mode-detail">
      ${parts.join(", ")} objective${total !== 1 ? "s" : ""} selected
    </span>`;
}

/* ── Manual render ────────────────────────────────────────────── */

/** Build and render the schedule from the current manual selection. */
function renderManual() {
  const { dailyObjs, weeklyObjs } = getManualObjectiveLists();

  if (dailyObjs.length + weeklyObjs.length === 0) {
    renderWelcome();
    updateModeBar(null);
    return;
  }

  const data = buildSchedule(dailyObjs, weeklyObjs, new Date());
  renderOutput(data);
  updateModeBar({ daily: dailyObjs.length, weekly: weeklyObjs.length });
  tzNote.textContent = "";   // timezone note is only meaningful for API data
}

/* ── API load ─────────────────────────────────────────────────── */

async function loadFromAPI() {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    renderError("Please enter an API key before loading objectives.");
    return;
  }

  localStorage.setItem(API_KEY_STORAGE, apiKey);
  refreshBtn.disabled   = true;
  refreshBtn.innerHTML  = `<span class="loading-spinner"></span>Loading…`;
  updateModeBar(null);
  renderLoading();

  try {
    const { daily, weekly } = await fetchAllObjectives(apiKey);
    const now  = new Date();
    const data = buildSchedule(daily.objectives, weekly.objectives, now);

    renderOutput(data);

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    tzNote.textContent =
      `Times shown in your local timezone (${tz}). Last refreshed: ${formatTime(now)}`;

  } catch (err) {
    renderError(err.message);
  } finally {
    refreshBtn.disabled   = false;
    refreshBtn.textContent = "Load from API";
  }
}

/* ── Event wiring ─────────────────────────────────────────────── */

refreshBtn.addEventListener("click", async () => {
  if (hasManualObjectives()) {
    const confirmed = await showDialog({
      message:      "You have manually selected objectives.<br><br>"
                  + "Loading from the API will replace your selection — "
                  + "any objectives you've chosen will be cleared.<br><br>"
                  + "Continue?",
      confirmLabel: "Load from API",
      cancelLabel:  "Keep my selection",
    });
    if (!confirmed) return;
    clearAllManualObjectives();
    updateModeBar(null);
  }
  await loadFromAPI();
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem(API_KEY_STORAGE);
  apiKeyInput.value  = "";
  tzNote.textContent = "";
  renderWelcome();
  updateModeBar(null);
});

apiKeyInput.addEventListener("keydown", e => {
  if (e.key === "Enter") refreshBtn.click();
});

openPickerBtn.addEventListener("click", () => openPicker());

/* ── Init ─────────────────────────────────────────────────────── */

// Wire up dialog and picker
initDialog();
initPicker(() => renderManual());   // re-render whenever the picker closes

// Restore saved API key (but do NOT auto-load — user must press the button)
const savedKey = localStorage.getItem(API_KEY_STORAGE);
if (savedKey) apiKeyInput.value = savedKey;

// Prune expired manual objectives and notify the user if anything was removed
const { removedDaily, removedWeekly } = pruneExpiredObjectives(new Date());
if (removedDaily > 0 || removedWeekly > 0) {
  renderExpiryNotice(removedDaily, removedWeekly);
}

// Show manual objectives if any remain; otherwise show welcome
if (hasManualObjectives()) {
  renderManual();
} else if (removedDaily === 0 && removedWeekly === 0) {
  // Only show welcome if we didn't already put the expiry notice in #output
  renderWelcome();
}
