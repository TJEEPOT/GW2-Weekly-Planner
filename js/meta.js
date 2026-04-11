/**
 * js/meta.js — Wizard's Vault Objective Metadata
 * ─────────────────────────────────────────────────────────────────
 * Each key is the numeric objective id returned by the GW2 API.
 *
 * Fields
 * ──────
 * time_per_stage  {number}   Minutes to reach, complete one stage,
 *                            and be ready for the next.
 * stage_count     {number}   How many stages make up the full
 *                            objective. Often equals progress_complete
 *                            from the API, but not always (e.g. an
 *                            objective worth 100 progress may really
 *                            be 10 meaningful stages of 10 each).
 * tip             {string}   Guidance shown to the player — fastest
 *                            route, useful tricks, alternatives.
 * waypoint        {string|null}  GW2 waypoint code. Click to copy.
 *                            Set to null when there's no single
 *                            best starting point.
 * timed           {boolean}  true if the objective is only available
 *                            at specific UTC times.
 * schedule        {string[]} (timed: true only) UTC "HH:MM" strings
 *                            for each spawn window.
 * priority        {boolean}  true = schedule this before non-priority
 *                            items. Always true for timed objectives;
 *                            true for non-timed objectives that will
 *                            NOT naturally complete while doing others.
 *
 * Adding a new objective
 * ──────────────────────
 * 1. Find the id from the API response or from:
 *    https://wiki.guildwars2.com/wiki/Wizard%27s_Vault/Easy_objectives
 * 2. Copy the template at the bottom of this file.
 * 3. Fill in the fields and remove the template comment.
 */

export const META = {

  /* ── Daily objectives ─────────────────────────────────────── */

  133: {
    time_per_stage: 1,
    stage_count:    1,
    tip:            "Simply logging in completes this — you've already done it!",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  149: {
    time_per_stage: 3,
    stage_count:    5,
    tip:            "Any enemy counts. Rift hunting, Hearts, or bounties will knock this out quickly alongside other objectives.",
    waypoint:       "[&BL4NAAA=]",
    timed:          false,
    priority:       false,
  },

  182: {
    time_per_stage: 3,
    stage_count:    1,
    tip:            "Any enemy with an orange defiance bar counts — rift champions, dungeon champions, or HoT map champions all work. One break is all you need.",
    waypoint:       "[&BL4NAAA=]",
    timed:          false,
    priority:       false,
  },

  1: {
    time_per_stage: 4,
    stage_count:    3,
    tip:            "This completes naturally alongside other objectives. If you need to focus on it, rift hunting gives two event completions per rift — look for active rifts on your map.",
    waypoint:       "[&BL4NAAA=]",
    timed:          false,
    priority:       false,
  },

  164: {
    time_per_stage: 5,
    stage_count:    5,
    tip:            "Any fishing spot works. Lakeside or river nodes are quickest to reach. Equip any fishing rod and use an appropriate bait for the location.",
    waypoint:       "[&BNMGAAA=]",
    timed:          false,
    priority:       false,
  },

  /* ── Weekly objectives ────────────────────────────────────── */

  5: {
    time_per_stage: 2,
    stage_count:    10,
    tip:            "Veterans appear in most mid-to-high level zones. World boss maps and HoT/PoF areas have dense veteran spawns. This completes naturally alongside events.",
    waypoint:       "[&BL4NAAA=]",
    timed:          false,
    priority:       false,
  },

  57: {
    time_per_stage: 4,
    stage_count:    10,
    tip:            "Events complete naturally during other objectives. Rift events count and chain quickly. For a dedicated run, Queensdale has frequent fast events near the waypoint.",
    waypoint:       "[&BNMGAAA=]",
    timed:          false,
    priority:       false,
  },

  47: {
    time_per_stage: 8,
    stage_count:    1,
    tip:            "Buy Unidentified Gear (any rarity) from the Trading Post — Blue/Green bags are cheapest. Use 'Identify All' from your inventory in one go. Much faster than farming drops.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  56: {
    time_per_stage: 18,
    stage_count:    1,
    tip:            "The Dark Reverie puzzle is in the Twilight Arbor area of Caledon Forest. Allow extra time if you're unfamiliar — there are guides on the GW2 wiki if you get stuck.",
    waypoint:       "[&BCQCAAA=]",
    timed:          false,
    priority:       false,
  },

  358: {
    time_per_stage: 15,
    stage_count:    1,
    tip:            "Prioritise the Tequatl fight — it's the fastest completion. If you miss the window, ten Sparkfly Fen events take around 60 minutes. Arrive at least 5 minutes early.",
    waypoint:       "[&BNABAAA=]",
    timed:          true,
    schedule:       ["00:00", "03:00", "07:00", "11:30", "16:00", "19:00"],
    priority:       true,
  },

  45: {
    time_per_stage: 45,
    stage_count:    1,
    tip:            "Any raid encounter on any wing counts — you don't need to clear the full raid. Spirit Vale W1 (Vale Guardian) is a good starting point. Check LFG for training runs.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  3: {
    time_per_stage: 8,
    stage_count:    5,
    tip:            "Bounty Boards are found in all Path of Fire maps. Alternatively, any open-world group event (with other players present) counts toward the group-event condition.",
    waypoint:       "[&BNQEAAA=]",
    timed:          false,
    priority:       false,
  },

  348: {
    time_per_stage: 20,
    stage_count:    1,
    tip:            "The quickest option is usually a Crystal Desert meta-event such as Branded or an Awakened Invasion. Check a timer site for what's running. A chain of 15 events in Kryta also fulfils this.",
    waypoint:       "[&BNQEAAA=]",
    timed:          false,
    priority:       false,
  },

  /* ── ADD NEW OBJECTIVES BELOW ─────────────────────────────────
   *
   * Template — copy, uncomment, and fill in:
   *
   * 999: {
   *   time_per_stage: 10,
   *   stage_count:    1,
   *   tip:            "How to complete this efficiently.",
   *   waypoint:       "[&XXXXXXX=]",   // or null
   *   timed:          false,
   *   // schedule:    ["HH:MM", ...],  // only needed when timed: true
   *   priority:       false,
   * },
   *
   * ─────────────────────────────────────────────────────────── */
};
