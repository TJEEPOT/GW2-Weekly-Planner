/**
 * js/main.js — Entry point
 *
 * Wires the API key input, refresh/clear buttons, and auto-load
 * behaviour together with the API, scheduler, and renderer.
 */

import { fetchAllObjectives }              from "./api.js";
import { buildSchedule, formatTime }       from "./scheduler.js";
import { renderOutput, renderLoading, renderError, renderWelcome } from "./render.js";

/* ── localStorage keys ────────────────────────────────────────── */

const API_KEY_STORAGE = "gw2_wv_apikey";

/* ── DOM refs ─────────────────────────────────────────────────── */

const apiKeyInput = /** @type {HTMLInputElement} */ (document.getElementById("apiKey"));
const refreshBtn  = document.getElementById("refreshBtn");
const clearBtn    = document.getElementById("clearBtn");
const tzNote      = document.getElementById("tzNote");

/* ── Core load function ───────────────────────────────────────── */

async function loadObjectives() {
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    renderError("Please enter an API key before loading objectives.");
    return;
  }

  // Persist key for next visit
  localStorage.setItem(API_KEY_STORAGE, apiKey);

  // Show loading state and disable button to prevent double-calls
  refreshBtn.disabled    = true;
  refreshBtn.innerHTML   = `<span class="loading-spinner"></span>Loading…`;
  renderLoading();

  try {
    const { daily, weekly } = await fetchAllObjectives(apiKey);
    const now  = new Date();
    const data = buildSchedule(daily.objectives, weekly.objectives, now);

    renderOutput(data);

    // Update the timezone / last-refreshed note
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    tzNote.textContent = `Times shown in your local timezone (${tz}). Last refreshed: ${formatTime(now)}`;

  } catch (err) {
    renderError(err.message);

  } finally {
    refreshBtn.disabled  = false;
    refreshBtn.textContent = "Refresh";
  }
}

/* ── Event wiring ─────────────────────────────────────────────── */

refreshBtn.addEventListener("click", loadObjectives);

clearBtn.addEventListener("click", () => {
  localStorage.removeItem(API_KEY_STORAGE);
  apiKeyInput.value = "";
  tzNote.textContent = "";
  renderWelcome();
});

// Allow pressing Enter in the key field to trigger a load
apiKeyInput.addEventListener("keydown", e => {
  if (e.key === "Enter") loadObjectives();
});

/* ── Auto-load on revisit ─────────────────────────────────────── */

const savedKey = localStorage.getItem(API_KEY_STORAGE);
if (savedKey) {
  apiKeyInput.value = savedKey;
  loadObjectives();
}
