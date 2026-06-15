/**
 * js/scheduler.js - Timeline scheduling logic
 *
 * Builds an ordered list of objectives, fitting non-timed objectives
 * into the gaps between timed events, respecting a pre-event buffer.
 */

import { META, PRIORITY } from "./meta.js";

/**
 * Minutes of clear time required before every timed event.
 * The scheduler will not start a non-timed objective if it would
 * bleed into this window.
 */
const BUFFER_MIN = 2;

/** Milliseconds per minute - used throughout for timestamp maths. */
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

  // All today's slots have passed - wrap to tomorrow's first slot
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
 * Find the slot `mover` should move to in order to clear `anchor`'s
 * occupied window (its activity period plus the buffer either side).
 *
 * The result is always strictly later than `mover`'s current slot —
 * even if `mover`'s own next scheduled time would already clear `anchor`,
 * we skip past it. Otherwise the resolver could "move" an objective back
 * onto the slot it already occupies and loop forever.
 *
 * @param {object} mover   Enriched timed objective being rescheduled
 * @param {object} anchor  Enriched timed objective staying where it is
 * @returns {Date}
 */
function _replacementSlot(mover, anchor) {
  const clearOfAnchorMs = anchor._nextSlot.getTime() + anchor._dur * MS + BUFFER_MIN * MS;
  const afterOwnSlotMs  = mover._nextSlot.getTime() + MS;
  return nextSlotAfter(mover._meta.schedule, new Date(Math.max(clearOfAnchorMs, afterOwnSlotMs)));
}

/**
 * Decide which of two conflicting timed objectives should give up its
 * natural slot, and where it lands instead.
 *
 * Preference order:
 *   1. Higher `priority` keeps its slot — the lower-priority objective
 *      is the one rescheduled (defaulting to NORMAL if unset, matching
 *      the non-timed sort below).
 *   2. Equal priority — whichever objective loses LESS time by moving
 *      is the one rescheduled.
 *
 * Rule 2 matters because a conflict's "winner" would otherwise be decided
 * purely by which objective's slot happens to fall chronologically first —
 * an arbitrary accident of the clock. That systematically punishes rare
 * events (large gaps between slots, so a big penalty for being bumped) in
 * favour of frequent ones (small penalty — their next slot is always close
 * by), since a rare event's sparse slots are statistically more likely to
 * be the "earlier" one in any given clash. Comparing the actual cost of
 * moving each candidate fixes that: the side with the nearer replacement
 * slot absorbs the delay, regardless of which one's natural slot came first.
 *
 * @param {object} a  Enriched timed objective, chronologically first slot
 * @param {object} b  Enriched timed objective, chronologically second slot
 * @returns {{ loser: object, replacement: Date }}
 */
function _resolveConflict(a, b) {
  const aPriority = a._meta?.priority ?? PRIORITY.NORMAL;
  const bPriority = b._meta?.priority ?? PRIORITY.NORMAL;

  const aReplacement = _replacementSlot(a, b);
  const bReplacement = _replacementSlot(b, a);

  if (aPriority !== bPriority) {
    return aPriority < bPriority
      ? { loser: a, replacement: aReplacement }
      : { loser: b, replacement: bReplacement };
  }

  const aCostMs = aReplacement.getTime() - a._nextSlot.getTime();
  const bCostMs = bReplacement.getTime() - b._nextSlot.getTime();

  return aCostMs <= bCostMs
    ? { loser: a, replacement: aReplacement }
    : { loser: b, replacement: bReplacement };
}

/**
 * Mutates the `timed` array, resolving any conflict between adjacent
 * (chronologically sorted) objectives by rescheduling whichever one
 * `_resolveConflict` deems should yield its slot. Repeats until no
 * conflicts remain.
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
        const { loser, replacement } = _resolveConflict(curr, next);
        loser._nextSlot = replacement;
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
 * Timed events that are imminent — i.e. their slot falls within the
 * BUFFER_MIN window from `now` — are placed first on the timeline
 * before any non-timed work, since there is no time to start anything
 * else before they begin.
 *
 * Returns:
 *   timeline  - objectives to do, in recommended order, each enriched with:
 *                 _type            "daily" | "weekly"
 *                 _meta            metadata entry or null
 *                 _dur             estimated duration in minutes
 *                 _scheduledStart  Date when the player should start this
 *                 _waiting         true if there is idle time before a timed event
 *                 _waitFrom        Date from which the wait begins (only when _waiting)
 *                 _nextSlot        Date of the timed event (only on timed objectives)
 *   completed - API-confirmed complete objectives (for display at the bottom)
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

  // Sort non-timed by priority descending (HIGH → NORMAL → LOW),
  // then by duration ascending within each priority tier so shorter
  // objectives fill gaps more efficiently.
  const nonTimedSorted = [...nonTimed].sort((a, b) => {
    const pa = a._meta?.priority ?? PRIORITY.NORMAL;
    const pb = b._meta?.priority ?? PRIORITY.NORMAL;
    if (pb !== pa) return pb - pa;   // higher priority first
    return a._dur - b._dur;          // shorter first within same tier
  });

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
        // Don't increment - re-check same index after splice
      } else {
        i++;
      }
    }
  }

  /**
   * Schedule a single timed event onto the timeline, advancing cursor.
   * @param {object} obj  Enriched timed objective with _nextSlot set
   */
  function scheduleTimedEvent(obj) {
    const waiting = cursor < obj._nextSlot;
    obj._scheduledStart = new Date(obj._nextSlot);
    obj._waiting        = waiting;
    if (waiting) obj._waitFrom = new Date(cursor);
    timeline.push(obj);
    cursor = new Date(obj._nextSlot.getTime() + obj._dur * MS);
  }

  // ── Imminent events: place any timed event whose slot is within
  //    BUFFER_MIN of now first, before any non-timed work. ─────────
  //
  // timedLeft is already sorted by _nextSlot ascending, so we just
  // pull from the front while the condition holds.
  const bufferMs = BUFFER_MIN * MS;
  while (
    timedLeft.length > 0 &&
    timedLeft[0]._nextSlot.getTime() - now.getTime() <= bufferMs
  ) {
    scheduleTimedEvent(timedLeft.shift());
  }

  // ── Interleave remaining non-timed into gaps around timed events ─
  while (timedLeft.length > 0) {
    const nextTimed = timedLeft.shift();
    const cutoffMs  = nextTimed._nextSlot.getTime() - bufferMs;

    drainQueueBefore(cutoffMs);
    scheduleTimedEvent(nextTimed);
  }

  // ── Append any remaining non-timed after all timed events ───────
  while (queue.length > 0) {
    const obj = queue.shift();
    obj._scheduledStart = new Date(cursor);
    obj._waiting        = false;
    timeline.push(obj);
    cursor = new Date(cursor.getTime() + obj._dur * MS);
  }

  return { timeline, completed: apiCompleted };
}
