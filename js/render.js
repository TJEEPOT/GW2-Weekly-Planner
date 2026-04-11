/**
 * js/render.js — DOM rendering and UI event binding
 */

import { isCompleted, formatTime, formatDuration, upcomingSlots } from "./scheduler.js";

/* ── Ticked state (localStorage) ─────────────────────────────── */

const TICK_STORAGE_KEY = "gw2_wv_ticked";

/** @type {Set<string>} */
let ticked = loadTicked();

function loadTicked() {
  try {
    return new Set(JSON.parse(localStorage.getItem(TICK_STORAGE_KEY) ?? "[]"));
  } catch {
    return new Set();
  }
}

function saveTicked() {
  localStorage.setItem(TICK_STORAGE_KEY, JSON.stringify([...ticked]));
}

/** Unique key for an objective across sessions. */
function tickKey(obj) {
  return `${obj._type}-${obj.id}`;
}

/* ── Card rendering ───────────────────────────────────────────── */

/**
 * Build the HTML string for a single objective card.
 * @param {object} obj     Enriched objective from the scheduler
 * @param {number} index   Position in the list (used for animation delay)
 */
function buildCardHTML(obj, index) {
  const meta     = obj._meta;
  const key      = tickKey(obj);
  const isTicked = ticked.has(key);
  const isDone   = isCompleted(obj);

  const cardClasses = [
    "obj-card",
    obj._type,
    isDone   ? "done-api" : "",
    isTicked ? "ticked"   : "",
  ].filter(Boolean).join(" ");

  // ── Time column ──────────────────────────────────────────────
  let timeColumnHTML;
  if (obj._scheduledStart) {
    const waitMins = (obj._waiting && obj._waitFrom)
      ? Math.max(0, Math.round((obj._nextSlot - obj._waitFrom) / 60_000))
      : 0;

    timeColumnHTML = `
      <div class="time-display">${formatTime(obj._scheduledStart)}</div>
      <div class="time-dur">${formatDuration(obj._dur)}</div>
      ${waitMins > 1
        ? `<div class="wait-label">+${formatDuration(waitMins)} wait</div>`
        : ""}
    `;
  } else {
    // API-completed, not scheduled
    timeColumnHTML = `<div class="time-display" style="font-size:1.6rem">✓</div>`;
  }

  // ── Badges ───────────────────────────────────────────────────
  const typeBadgeHTML     = `<span class="badge badge-${obj._type}">${obj._type}</span>`;
  const timedBadgeHTML    = meta?.timed     ? `<span class="badge badge-timed">⏱ Timed</span>` : "";
  const priorityBadgeHTML = meta?.priority  ? `<span class="badge badge-priority">★ Priority</span>` : "";
  const noMetaBadgeHTML   = !meta           ? `<span class="badge badge-no-meta">⚠ No metadata</span>` : "";
  const acclaimHTML       = `<span class="acclaim-label">${obj.acclaim} Astral Acclaim</span>`;

  // ── Progress bar ─────────────────────────────────────────────
  const pct = Math.round((obj.progress_current / obj.progress_complete) * 100);
  const progressHTML = `
    <div class="progress-wrap">
      <div class="progress-bar">
        <div class="progress-fill" style="width:${pct}%"></div>
      </div>
      <span class="progress-text">${obj.progress_current}/${obj.progress_complete}</span>
    </div>
  `;

  // ── Waypoint button ──────────────────────────────────────────
  const waypointHTML = meta?.waypoint
    ? `<button class="waypoint-btn" data-wp="${meta.waypoint}" title="Click to copy waypoint code">
         <span class="copy-icon">⧉</span>${meta.waypoint}
       </button>`
    : "";

  // ── Timer schedule ───────────────────────────────────────────
  let timerHTML = "";
  if (meta?.timed && obj._nextSlot) {
    const slots  = upcomingSlots(meta.schedule, new Date(), 3);
    const labels = slots.map(d => formatTime(d)).join(", ");
    timerHTML = `<div class="timer-info">🕐 Next: ${labels}</div>`;
  }

  // ── Tip / description ────────────────────────────────────────
  const tipHTML = meta?.tip
    ? `<div class="obj-tip">${meta.tip}</div>`
    : `<div class="obj-tip no-meta">No metadata entry found for this objective — add it to <code>js/meta.js</code> to enable scheduling and tips.</div>`;

  // ── Checkbox ─────────────────────────────────────────────────
  const checkIcon = (isDone || isTicked) ? "✓" : "";

  return `
    <div
      class="${cardClasses}"
      style="animation-delay:${index * 0.04}s"
    >
      <div class="obj-time">
        ${timeColumnHTML}
      </div>

      <div class="obj-body">
        <div class="obj-meta-row">
          ${typeBadgeHTML}${timedBadgeHTML}${priorityBadgeHTML}${noMetaBadgeHTML}${acclaimHTML}
        </div>
        <div class="obj-title">${obj.title}</div>
        ${tipHTML}
        <div class="obj-footer">
          ${progressHTML}${waypointHTML}${timerHTML}
        </div>
      </div>

      <div class="obj-check-col">
        <div
          class="check-box"
          role="checkbox"
          aria-checked="${isTicked || isDone}"
          tabindex="0"
          data-key="${key}"
          data-done="${isDone}"
        >${checkIcon}</div>
      </div>
    </div>
  `;
}

/* ── Event binding ────────────────────────────────────────────── */

/** Bind click/keyboard handlers to all waypoint copy buttons in `root`. */
function bindWaypointButtons(root) {
  root.querySelectorAll(".waypoint-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const text = this.dataset.wp;

      const showPopup = () => {
        // Remove any existing popup first
        this.querySelector(".copied-popup")?.remove();
        const popup = document.createElement("span");
        popup.className   = "copied-popup";
        popup.textContent = "Copied!";
        this.appendChild(popup);
        popup.addEventListener("animationend", () => popup.remove());
      };

      navigator.clipboard?.writeText(text).then(showPopup).catch(() => {
        // Clipboard API unavailable — use legacy execCommand fallback
        const ta = Object.assign(document.createElement("textarea"), {
          value: text,
          style: "position:fixed;opacity:0",
        });
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        showPopup();
      });
    });
  });
}

/** Bind click/keyboard handlers to all manual tick checkboxes in `root`. */
function bindCheckboxes(root) {
  root.querySelectorAll(".check-box").forEach(box => {
    const toggle = () => {
      if (box.dataset.done === "true") return; // API-completed; can't manually untick

      const key  = box.dataset.key;
      const card = box.closest(".obj-card");

      if (ticked.has(key)) {
        ticked.delete(key);
        box.textContent = "";
        card.classList.remove("ticked");
        box.setAttribute("aria-checked", "false");
      } else {
        ticked.add(key);
        box.textContent = "✓";
        card.classList.add("ticked");
        box.setAttribute("aria-checked", "true");
      }

      saveTicked();
    };

    box.addEventListener("click", toggle);
    box.addEventListener("keydown", e => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggle();
      }
    });
  });
}

/** Bind the completed-section collapse toggle. */
function bindCompletedToggle() {
  const toggle = document.getElementById("completedToggle");
  if (!toggle) return;

  const list  = document.getElementById("completedList");
  const arrow = document.getElementById("toggleArrow");

  toggle.addEventListener("click", () => {
    list.classList.toggle("open");
    arrow.classList.toggle("open");
  });
}

/* ── Public render function ───────────────────────────────────── */

/**
 * Render the full objective output into #output.
 * @param {{ timeline: object[], completed: object[] }} data
 */
export function renderOutput(data) {
  const { timeline, completed } = data;

  // Identify any objectives that are missing metadata entries
  const missingMeta = [...timeline, ...completed].filter(o => !o._meta);

  let html = "";

  // Legend
  html += `
    <div class="legend">
      <div class="legend-item"><div class="legend-swatch daily"></div>Daily reset</div>
      <div class="legend-item"><div class="legend-swatch weekly"></div>Weekly reset</div>
    </div>
  `;

  // Missing metadata warning
  if (missingMeta.length > 0) {
    const names = missingMeta.map(o => `<strong>${o.title}</strong>`).join(", ");
    html += `
      <div class="meta-warning">
        ⚠ ${missingMeta.length} objective(s) have no entry in <code>js/meta.js</code>
        and are using a 10-minute default estimate: ${names}.
      </div>
    `;
  }

  // Active scheduled timeline
  if (timeline.length === 0) {
    html += `
      <div class="status-block">
        <div class="status-icon">🏆</div>
        <div>All objectives complete for this period!</div>
      </div>
    `;
  } else {
    html += `<div class="section-label active">◆ Scheduled Objectives</div>`;
    timeline.forEach((obj, i) => { html += buildCardHTML(obj, i); });
  }

  // Completed (API-confirmed) section
  if (completed.length > 0) {
    html += `
      <div class="completed-toggle" id="completedToggle">
        <span class="toggle-arrow" id="toggleArrow">▶</span>
        Completed objectives (${completed.length})
      </div>
      <div id="completedList">
        <div class="section-label completed">✓ Completed</div>
        ${completed.map((obj, i) => buildCardHTML(obj, i)).join("")}
      </div>
    `;
  }

  // Write to DOM
  const output = document.getElementById("output");
  output.innerHTML = html;

  // Bind interactive elements
  bindWaypointButtons(output);
  bindCheckboxes(output);
  bindCompletedToggle();
}

/**
 * Show a loading state in #output.
 */
export function renderLoading() {
  document.getElementById("output").innerHTML = `
    <div class="status-block">
      <span class="loading-spinner"></span> Fetching objectives from the GW2 API…
    </div>
  `;
}

/**
 * Show an error message in #output.
 * @param {string} message
 */
export function renderError(message) {
  document.getElementById("output").innerHTML = `
    <div class="error-block">
      <strong>Could not load objectives:</strong> ${message}<br>
      <span style="font-size:0.85rem;opacity:0.8">
        Check that your API key is valid and has the
        <em>account</em> and <em>progression</em> permissions enabled.
      </span>
    </div>
  `;
}

/**
 * Show the default welcome/splash state in #output.
 */
export function renderWelcome() {
  document.getElementById("output").innerHTML = `
    <div class="status-block">
      <div class="status-icon">⚗</div>
      <div>Enter your API key and click <strong>Load Objectives</strong> to begin.</div>
      <div class="status-sub">Your key is stored only in this browser and sent only to the official GW2 API.</div>
    </div>
  `;
}
