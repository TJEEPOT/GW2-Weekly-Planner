/**
 * js/scheduler.js — Timeline scheduling logic
 *
 * Builds an ordered list of objectives, fitting non-timed objectives
 * into the gaps between timed events, respecting a pre-event buffer.
 */

import { META } from "./meta.js";

/** Minutes of clear time required before every timed event. */
const BUFFER_MIN = 5;

/** Milliseconds per minute — used throughout for timestamp maths. */
const MS = 60_000;

/* ── Helpers ──────────────────────────────────────────────────── */

/**
 * Returns true when an objective's progress is at or above its target.
 * @param {object} obj  Raw API objective
 */
export function isCompleted(obj) {
  return obj.progress_current >= obj.progress_complete;
}

/**
 * Total estimated duration for an objective in minutes.
 * Falls back to 10 minutes when no metadata is available.
 * @param {object} obj  Enriched objective (has _meta attached)
 */
export function objectiveDurationMin(obj) {
  if (!obj._meta) return 10;
  return obj._meta.time_per_stage * obj._meta.stage_count;
}

/**
 * Format a Date as a short local time string (HH:MM).
 * @param {Date} date
 */
export function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Format a duration in minutes as a human-readable string.
 * @param {number} minutes
 */
export function formatDuration(minutes) {
  if (minutes < 1)  return "< 1 min";
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return m ? `${h}h ${m}m` : `${h}h`;
}

/* ── Slot finding ─────────────────────────────────────────────── */

/**
 * Given an array of UTC time strings (["HH:MM", ...]) and a reference
 * Date, return a new Date for the next slot that is >= afterDate.
 * Wraps to the following day if necessary.
 *
 * @param {string[]} schedule  e.g. ["00:00", "07:00", "16:00"]
 * @param {Date}     afterDate
 * @returns {Date}
 */
export function nextSlotAfter(schedule, afterDate) {
  const afterMs = afterDate.getTime();

  // Build midnight UTC for the same day as afterDate
  const dayStart = new Date(afterDate);
  dayStart.setUTCHours(0, 0, 0, 0);

  // Convert each "HH:MM" to a timestamp for today, sorted ascending
  const slotsToday = schedule
    .map(t => {
      const [h, m] = t.split(":").map(Number);
      return dayStart.getTime() + (h * 60 + m) * MS;
    })
    .sort((a, b) => a - b);

  // First slot that hasn't passed yet
  const next = slotsToday.find(s => s >= afterMs);
  if (next !== undefined) return new Date(next);

  // All today's slots have passed — wrap to tomorrow's first slot
  const tomorrow = new Date(dayStart);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  const [h, m] = schedule[0].split(":").map(Number);
  return new Date(tomorrow.getTime() + (h * 60 + m) * MS);
}

/**
 * Returns the next `count` upcoming slot times for a schedule,
 * starting from `fromDate`.
 *
 * @param {string[]} schedule
 * @param {Date}     fromDate
 * @param {number}   count
 * @returns {Date[]}
 */
export function upcomingSlots(schedule, fromDate, count = 3) {
  const slots = [];
  let cursor  = new Date(fromDate);
  for (let i = 0; i < count; i++) {
    const s = nextSlotAfter(schedule, cursor);
    slots.push(s);
    cursor = new Date(s.getTime() + MS); // +1 minute to find the *next* distinct slot
  }
  return slots;
}

/* ── Conflict resolution ──────────────────────────────────────── */

/**
 * Mutates the `timed` array, pushing any objective whose window
 * conflicts with a later one forward to its next available slot.
 * Repeats until no conflicts remain.
 *
 * A conflict occurs when:
 *   currEnd + BUFFER > nextStart - BUFFER
 * where currEnd = curr._nextSlot + curr._dur
 *
 * @param {object[]} timed  Enriched objectives with _nextSlot and _dur
 */
function resolveTimedConflicts(timed) {
  let changed = true;
  while (changed) {
    changed = false;
    timed.sort((a, b) => a._nextSlot - b._nextSlot);

    for (let i = 0; i < timed.length - 1; i++) {
      const curr = timed[i];
      const next = timed[i + 1];

      const currEndsMs  = curr._nextSlot.getTime() + curr._dur * MS + BUFFER_MIN * MS;
      const nextNeedsMs = next._nextSlot.getTime() - BUFFER_MIN * MS;

      if (currEndsMs > nextNeedsMs) {
        // Conflict: push curr to its next slot after next finishes (+buffer)
        const pushAfterMs = next._nextSlot.getTime() + next._dur * MS + BUFFER_MIN * MS;
        curr._nextSlot = nextSlotAfter(curr._meta.schedule, new Date(pushAfterMs));
        changed = true;
        break; // Re-sort and restart
      }
    }
  }
}

/* ── Main scheduler ───────────────────────────────────────────── */

/**
 * Build a complete, ordered schedule from raw API objective lists.
 *
 * Returns:
 *   timeline  — objectives to do, in recommended order, each enriched with:
 *                 _type            "daily" | "weekly"
 *                 _meta            metadata entry or null
 *                 _dur             estimated duration in minutes
 *                 _scheduledStart  Date when the player should start this
 *                 _waiting         true if there is idle time before a timed event
 *                 _waitFrom        Date from which the wait begins (only when _waiting)
 *                 _nextSlot        Date of the timed event (only on timed objectives)
 *   completed — API-confirmed complete objectives (for display at the bottom)
 *
 * @param {object[]} dailyObjs   objectives[] from the /daily endpoint
 * @param {object[]} weeklyObjs  objectives[] from the /weekly endpoint
 * @param {Date}     now
 * @returns {{ timeline: object[], completed: object[] }}
 */
export function buildSchedule(dailyObjs, weeklyObjs, now) {
  // Tag and enrich all objectives
  const all = [
    ...dailyObjs.map(o => ({ ...o, _type: "daily" })),
    ...weeklyObjs.map(o => ({ ...o, _type: "weekly" })),
  ].map(o => ({
    ...o,
    _meta: META[o.id] ?? null,
    _dur:  0, // filled below
  }));

  all.forEach(o => { o._dur = objectiveDurationMin(o); });

  // Split completed (API) from the to-do list
  const apiCompleted = all.filter(o =>  isCompleted(o));
  const todo         = all.filter(o => !isCompleted(o));

  // Separate timed from non-timed
  const timed    = todo.filter(o =>  o._meta?.timed);
  const nonTimed = todo.filter(o => !o._meta?.timed);

  // Find the next available slot for each timed objective
  timed.forEach(o => {
    o._nextSlot = nextSlotAfter(o._meta.schedule, now);
  });

  // Resolve scheduling conflicts between timed objectives
  resolveTimedConflicts(timed);
  timed.sort((a, b) => a._nextSlot - b._nextSlot);

  // Sort non-timed: priority first, then by ascending duration
  // (shorter objectives are easier to slot into gaps)
  const nonTimedSorted = [
    ...nonTimed.filter(o =>  o._meta?.priority).sort((a, b) => a._dur - b._dur),
    ...nonTimed.filter(o => !o._meta?.priority).sort((a, b) => a._dur - b._dur),
  ];

  // ── Fill the timeline ────────────────────────────────────────
  const timeline  = [];
  let   cursor    = new Date(now);
  const queue     = [...nonTimedSorted];
  const timedLeft = [...timed];

  /**
   * Drain as many queued non-timed objectives as will fit
   * before `cutoffMs` (the buffer window before the next timed event).
   * Objectives are never split — they either fit whole or are skipped.
   */
  function drainQueueBefore(cutoffMs) {
    let i = 0;
    while (i < queue.length) {
      const obj      = queue[i];
      const objEndMs = cursor.getTime() + obj._dur * MS;

      if (objEndMs <= cutoffMs) {
        obj._scheduledStart = new Date(cursor);
        obj._waiting        = false;
        timeline.push(obj);
        queue.splice(i, 1);
        cursor = new Date(objEndMs);
        // Don't increment — re-check same index after splice
      } else {
        i++;
      }
    }
  }

  // Interleave non-timed objectives into gaps around timed events
  while (timedLeft.length > 0) {
    const nextTimed  = timedLeft.shift();
    const cutoffMs   = nextTimed._nextSlot.getTime() - BUFFER_MIN * MS;

    drainQueueBefore(cutoffMs);

    // Schedule the timed event at its fixed time
    const waiting = cursor < nextTimed._nextSlot;
    nextTimed._scheduledStart = new Date(nextTimed._nextSlot);
    nextTimed._waiting        = waiting;
    if (waiting) nextTimed._waitFrom = new Date(cursor);

    timeline.push(nextTimed);
    cursor = new Date(nextTimed._nextSlot.getTime() + nextTimed._dur * MS);
  }

  // Append any remaining non-timed objectives after all timed events
  while (queue.length > 0) {
    const obj = queue.shift();
    obj._scheduledStart = new Date(cursor);
    obj._waiting        = false;
    timeline.push(obj);
    cursor = new Date(cursor.getTime() + obj._dur * MS);
  }

  return { timeline, completed: apiCompleted };
}
