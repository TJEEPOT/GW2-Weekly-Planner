/**
 * js/render.js - DOM rendering and UI event binding
 */

import { isCompleted, formatTime, formatDuration, upcomingSlots } from "./scheduler.js";
import { PRIORITY } from "./meta.js";

/* ── Ticked state (localStorage) ─────────────────────────────── */

const TICK_STORAGE_KEY = "gw2_wv_ticked";

/** @type {Set<string>} */
let ticked = _loadTicked();

function _loadTicked() {
  try {
    return new Set(JSON.parse(localStorage.getItem(TICK_STORAGE_KEY) ?? "[]"));
  } catch {
    return new Set();
  }
}

function _saveTicked() {
  localStorage.setItem(TICK_STORAGE_KEY, JSON.stringify([...ticked]));
}

function _tickKey(obj) {
  return `${obj._type}-${obj.id}`;
}

/* ── Card rendering ───────────────────────────────────────────── */

function buildCardHTML(obj, index) {
  const meta     = obj._meta;
  const key      = _tickKey(obj);
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
        : ""}`;
  } else {
    timeColumnHTML = `<div class="time-display" style="font-size:1.6rem">✓</div>`;
  }

  // ── Badges ───────────────────────────────────────────────────
  const timedBadge    = meta?.timed                      ? `<span class="badge badge-timed">⏱ Timed</span>`      : "";
  const priorityBadge = meta?.priority === PRIORITY.HIGH  ? `<span class="badge badge-priority">★ Priority</span>` : "";
  const noMetaBadge   = !meta                             ? `<span class="badge badge-no-meta">⚠ No metadata</span>` : "";
  const acclaimLabel  = `<span class="acclaim-label">${obj.acclaim} Astral Acclaim</span>`;

  // ── Progress — ticked manual/API shows N/N, otherwise real progress ──
  const displayCurrent  = (isDone || isTicked) ? obj.progress_complete : obj.progress_current;
  const pct             = Math.round((displayCurrent / obj.progress_complete) * 100);
  const progressHTML    = `
    <div class="progress-wrap">
      <div class="progress-bar">
        <div class="progress-fill" style="width:${pct}%"></div>
      </div>
      <span class="progress-text">${displayCurrent}/${obj.progress_complete}</span>
    </div>`;

  // ── Waypoint ─────────────────────────────────────────────────
  const waypointHTML = meta?.waypoint
    ? `<button class="waypoint-btn" data-wp="${meta.waypoint}" title="Click to copy waypoint code">
         <span class="copy-icon">⧉</span>${meta.waypoint}
       </button>`
    : "";

  // ── Timer ────────────────────────────────────────────────────
  let timerHTML = "";
  if (meta?.timed && obj._nextSlot) {
    const slots  = upcomingSlots(meta.schedule, new Date(), 3);
    timerHTML = `<div class="timer-info">🕐 Next: ${slots.map(d => formatTime(d)).join(", ")}</div>`;
  }

  // ── Tip ──────────────────────────────────────────────────────
  const tipHTML = meta?.tip
    ? `<div class="obj-tip">${meta.tip}</div>`
    : `<div class="obj-tip no-meta">No metadata entry for this objective — add it to <code>js/meta.js</code>.</div>`;

  const checkIcon = (isDone || isTicked) ? "✓" : "";

  return `
    <div class="${cardClasses}"
         style="animation-delay:${index * 0.04}s"
         data-progress-current="${obj.progress_current}"
         data-progress-complete="${obj.progress_complete}">

      <div class="obj-time">${timeColumnHTML}</div>

      <div class="obj-body">
        <div class="obj-meta-row">
          ${timedBadge}${priorityBadge}${noMetaBadge}${acclaimLabel}
        </div>
        <div class="obj-title">${obj.title}</div>
        ${tipHTML}
        <div class="obj-footer">
          ${progressHTML}${waypointHTML}${timerHTML}
        </div>
      </div>

      <div class="obj-check-col">
        <div class="check-box"
             role="checkbox"
             aria-checked="${isTicked || isDone}"
             tabindex="0"
             data-key="${key}"
             data-done="${isDone}">${checkIcon}</div>
      </div>
    </div>`;
}

/* ── Event binding ────────────────────────────────────────────── */

function _bindWaypointButtons(root) {
  root.querySelectorAll(".waypoint-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const text = this.dataset.wp;
      const showPopup = () => {
        this.querySelector(".copied-popup")?.remove();
        const popup = document.createElement("span");
        popup.className   = "copied-popup";
        popup.textContent = "Copied!";
        this.appendChild(popup);
        popup.addEventListener("animationend", () => popup.remove());
      };
      navigator.clipboard?.writeText(text).then(showPopup).catch(() => {
        const ta = Object.assign(document.createElement("textarea"),
          { value: text, style: "position:fixed;opacity:0" });
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        showPopup();
      });
    });
  });
}

function _bindCheckboxes(root) {
  root.querySelectorAll(".check-box").forEach(box => {
    const toggle = () => {
      if (box.dataset.done === "true") return;

      const key      = box.dataset.key;
      const card     = box.closest(".obj-card");
      const fill     = card.querySelector(".progress-fill");
      const text     = card.querySelector(".progress-text");
      const origCur  = parseInt(card.dataset.progressCurrent);
      const complete = parseInt(card.dataset.progressComplete);
      const origPct  = Math.round((origCur / complete) * 100);

      if (ticked.has(key)) {
        // Untick — restore to original progress
        ticked.delete(key);
        box.textContent = "";
        card.classList.remove("ticked");
        box.setAttribute("aria-checked", "false");
        fill.style.width      = `${origPct}%`;
        text.textContent      = `${origCur}/${complete}`;
      } else {
        // Tick — show as fully complete
        ticked.add(key);
        box.textContent = "✓";
        card.classList.add("ticked");
        box.setAttribute("aria-checked", "true");
        fill.style.width      = "100%";
        text.textContent      = `${complete}/${complete}`;
      }

      _saveTicked();
    };

    box.addEventListener("click", toggle);
    box.addEventListener("keydown", e => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); }
    });
  });
}

function _bindCompletedToggle() {
  const toggle = document.getElementById("completedToggle");
  if (!toggle) return;
  const list  = document.getElementById("completedList");
  const arrow = document.getElementById("toggleArrow");
  toggle.addEventListener("click", () => {
    list.classList.toggle("open");
    arrow.classList.toggle("open");
  });
}

/* ── Public functions ─────────────────────────────────────────── */

export function renderOutput(data) {
  const { timeline, completed } = data;
  const missingMeta = [...timeline, ...completed].filter(o => !o._meta);

  let html = `
    <div class="legend">
      <div class="legend-item"><div class="legend-swatch daily"></div>Daily reset</div>
      <div class="legend-item"><div class="legend-swatch weekly"></div>Weekly reset</div>
    </div>`;

  if (missingMeta.length > 0) {
    const names = missingMeta.map(o => `<strong>${o.title}</strong>`).join(", ");
    html += `
      <div class="meta-warning">
        ⚠ ${missingMeta.length} objective(s) have no entry in <code>js/meta.js</code>
        and are using a 10-minute default estimate: ${names}.
      </div>`;
  }

  if (timeline.length === 0) {
    html += `
      <div class="status-block">
        <div class="status-icon">🏆</div>
        <div>All objectives complete for this period!</div>
      </div>`;
  } else {
    html += `<div class="section-label active">◆ Scheduled Objectives</div>`;
    timeline.forEach((obj, i) => { html += buildCardHTML(obj, i); });
  }

  if (completed.length > 0) {
    html += `
      <div class="completed-toggle" id="completedToggle">
        <span class="toggle-arrow" id="toggleArrow">▶</span>
        Completed objectives (${completed.length})
      </div>
      <div id="completedList">
        <div class="section-label completed">✓ Completed</div>
        ${completed.map((obj, i) => buildCardHTML(obj, i)).join("")}
      </div>`;
  }

  const output = document.getElementById("output");
  output.innerHTML = html;
  _bindWaypointButtons(output);
  _bindCheckboxes(output);
  _bindCompletedToggle();
}

export function renderLoading() {
  document.getElementById("output").innerHTML = `
    <div class="status-block">
      <span class="loading-spinner"></span> Fetching objectives from the GW2 API…
    </div>`;
}

export function renderError(message) {
  document.getElementById("output").innerHTML = `
    <div class="error-block">
      <strong>Could not load objectives:</strong> ${message}<br>
      <span style="font-size:0.85rem;opacity:0.8">
        Check that your API key is valid and has the
        <em>account</em> and <em>progression</em> permissions enabled.
      </span>
    </div>`;
}

export function renderWelcome() {
  document.getElementById("output").innerHTML = `
    <div class="status-block">
      <div class="status-icon">⚗</div>
      <div>Welcome to the Wizard's Vault Planner.</div>
      <div class="status-sub" style="margin-top:1rem;max-width:520px;margin-left:auto;margin-right:auto">
        <strong>Load from API</strong> — enter your GW2 API key above and click
        <em>Load from API</em> to fetch your current objectives directly.<br><br>
        <strong>Manual mode</strong> — if the API hasn't updated yet after logging in
        (it can take up to an hour), click
        <em>Select Objectives Manually</em> to choose the objectives
        you've been given and build your schedule immediately.
      </div>
    </div>`;
}

/**
 * Show a notice in #output explaining that expired objectives were removed.
 * If there are still objectives to show, main.js will call renderManual()
 * afterwards and overwrite this. This is only the final state when nothing
 * remains after pruning.
 *
 * @param {number} removedDaily
 * @param {number} removedWeekly
 */
export function renderExpiryNotice(removedDaily, removedWeekly) {
  const parts = [];
  if (removedDaily  > 0) parts.push(`${removedDaily} daily objective${removedDaily  !== 1 ? "s" : ""}`);
  if (removedWeekly > 0) parts.push(`${removedWeekly} weekly objective${removedWeekly !== 1 ? "s" : ""}`);

  const banner = document.getElementById("expiryBanner");
  banner.innerHTML = `
    <span class="expiry-icon">🔄</span>
    <span class="expiry-text">
      <strong>${parts.join(" and ")} removed</strong> —
      ${removedDaily  > 0 ? "the daily reset has passed (00:00 UTC)." : ""}
      ${removedWeekly > 0 ? "the weekly reset has passed (Monday 07:30 UTC)." : ""}
      Your saved selection has been updated.
    </span>`;
  banner.classList.remove("hidden");
}
