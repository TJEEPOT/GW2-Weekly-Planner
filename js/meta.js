/**
 * js/meta.js - Wizard's Vault Objective Metadata
 * ─────────────────────────────────────────────────────────────────
 * Each key is the numeric objective id returned by the GW2 API.
 *
 * Fields
 * ──────
 * time_per_stage  {number}   Minutes to reach, complete one stage,
 *                            and be ready for the next.
 * stage_count     {number}   How many stages make up the full
 *                            objective. Often equals progress_complete
 *                            from the API, but not always.
 * time_verified   {boolean}  false = time_per_stage / stage_count are
 *                            estimates only. Set to true once you have
 *                            timed the objective in-game. Not shown to
 *                            the user - scheduling still works either
 *                            way, but verified entries will be more
 *                            accurate.
 * tip             {string}   Guidance shown to the player.
 * waypoint        {string|null}  GW2 waypoint code to copy into chat.
 *                            null = no single obvious starting point,
 *                            or code still needs in-game verification.
 * timed           {boolean}  true if only available at specific UTC times.
 * schedule        {string[]} (timed:true only) UTC "HH:MM" spawn windows.
 * priority        {PRIORITY} PRIORITY.HIGH   = timed or must-do-first objectives.
 *                            PRIORITY.NORMAL = active objectives worth doing deliberately.
 *                            PRIORITY.LOW    = passively completes alongside other objectives.
 *
 */

/**
 * Priority levels for objective scheduling.
 * Use these named constants rather than raw numbers — the scheduler
 * sorts numerically (HIGH > NORMAL > LOW), but the names make intent
 * clear when editing entries.
 */
export const PRIORITY = Object.freeze({
  HIGH:   3,  // Timed events; anything you'd stop other tasks to catch
  NORMAL: 2,  // Active objectives worth doing deliberately
  LOW:    1,  // Completes passively alongside other objectives; schedule last
});

export const META = {

  /* ══════════════════════════════════════════════════════════════
     PvE - DAILY (10 acclaim)
     ══════════════════════════════════════════════════════════════ */

  133: {
    // Log In
    title:          "Log In",
    track:          "PvE",
    acclaim:        5,
    time_per_stage: 1,
    stage_count:    1,
    time_verified:  true,
    tip:            "Simply logging in completes this automatically.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.LOW,
  },

  125: {
    // Dodge 3 Enemy Attacks Using a Dodge Roll
    title:          "Dodge 3 Enemy Attacks Using a Dodge Roll",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.33,
    stage_count:    3,
    time_verified:  true,
    tip:            "You only need to press the dodge key while in combat - you don't have to actually evade an attack. Quickest method: take a small fall from your skyscale to enter combat, then dodge 3 times. Or go to the PvP lobby and dodge next to the running target golems at the Combat Training WP.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  20: {
    // Perform 3 Combo Skills in Combat
    title:          "Perform 3 Combo Skills in Combat",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.33,
    stage_count:    3,
    time_verified:  true,
    tip:            "Most rotations trigger combos naturally during regular combat. If you want to target this objective, go to the PvP lobby (Combat Training WP) and use combo finishers inside a combo field on the golems. Alternatively, attack Trainer Raji at the Seitung Province Training Grounds (Monastery WP).",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  182: {
    // Break 1 Enemy's Defiance Bar
    title:          "Break 1 Enemy\'s Defiance Bar",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 1,
    stage_count:    1,
    time_verified:  true,
    tip:            "Any orange defiance bar counts. Easiest options: (1) PvP lobby - attack the Elite Target Golem and use crowd-control skills; Siege Turtle or Warclaw break bars fast. (2) LA Aerodrome Special Forces Training Area - configure a golem with a defiance bar. (3) Seitung Province Training Grounds (Monastery WP) - the Training Mech hero point south-east of the WP has a defiance bar.",
    waypoint:       "[&BL8MAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  149: {
    // Defeat 25 Enemies
    title:          "Defeat 25 Enemies",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.1,
    stage_count:    25,
    time_verified:  true,
    tip:            "Completes naturally alongside almost any other PvE objective. For a dedicated run: Pocket Raptors south of Westwatch WP (Verdant Brink) spawn in large packs, or Fireflies and Scaled Drakes south-west of Wardenhurst WP (The Verdence) are low-level and fast to clear.",
    waypoint:       "[&BL4NAAA=]",
    timed:          false,
    priority:       PRIORITY.LOW,
  },

  140: {
    // Defeat 5 Veteran Enemies
    title:          "Defeat 5 Veteran Enemies",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.4,
    stage_count:    5,
    time_verified:  true,
    tip:            "Completes naturally during other objectives. If you want to focus on it, travel to Fort Marriner and enter the Fractal portal, choosing level 4 Urban Battleground. Enter the fractal and turn right just outside the starting tent - waves of low-health veteran enemies constantly spawn here.",
    waypoint:       "[&BDAEAAA=]",
    timed:          false,
    priority:       PRIORITY.LOW,
  },

  34: {
    // Defeat 10 Enemies While Under a Nourishment Effect
    title:          "Defeat 10 Enemies While Under a Nourishment Effect",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.1,
    stage_count:    10,
    time_verified:  true,
    tip:            "Eat any food before starting (the Malnourished debuff also counts). Easiest food buff is the cake fired from a Birthday Blaster or Feast of Delectable Birthday Cake, though if you don't have those, the cheapest option is usually a Soul Pastry.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.HIGH,
  },

  195: {
    // Defeat 10 Enemies While Under an Enhancement Effect
    title:          "Defeat 10 Enemies While Under an Enhancement Effect",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.1,
    stage_count:    10,
    time_verified:  true,
    tip:            "Use any utility consumable before starting (the Diminished debuff also counts). The easiest option is to use a Candy Corn / Zhaitaffy / Snowflake gobbler, though if you don't have these, the cheapest option is usually an Apprentice Tuning Crystal.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.HIGH,
  },

  104: {
    // Defeat 10 Enemies in the Heart of Maguuma
    title:          "Defeat 10 Enemies in the Heart of Maguuma",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.2,
    stage_count:    10,
    time_verified:  true,
    tip:            "Pocket Raptors in Dry Step Mesas (Shipwreck Peak WP, Maguuma's Breach) spawn in large groups and die quickly.",
    waypoint:       "[&BN4HAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  132: {
    // Defeat 10 Enemies in the Horn of Maguuma
    title:          "Defeat 10 Enemies in the Horn of Maguuma",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.3,
    stage_count:    10,
    time_verified:  true,
    tip:            "Non-hostile Dust Mites spawn around the Wizard's Tower area (Tower Courtyard WP, Outer Ring) and can be killed easily.",
    waypoint:       "[&BB8OAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  83: {
    // Defeat 10 Enemies in Cantha
    title:          "Defeat 10 Enemies in Cantha",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.3,
    stage_count:    10,
    time_verified:  true,
    tip:            "Non-aggressive animals east of the Spirit Vestibule POI in Seitung Province (Village WP, Seitung Harbor) are plentiful and easy to kill, though any End of Dragons map works.",
    waypoint:       "[&BJ4MAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  58: {
    // Defeat 10 Enemies in the Crystal Desert
    title:          "Defeat 10 Enemies in the Crystal Desert",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.3,
    stage_count:    10,
    time_verified:  true,
    tip:            "Forged Prowlers spawn in packs in Vehjin Mines (Vehjin Palace WP, Desert Highlands) during events. Enemies north of Destiny's Gorge WP in the blockaded cliff pass are also reliable.",
    waypoint:       "[&BO0KAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  276: {
    // Defeat 10 Enemies in the Janthir Region
    title:          "Defeat 10 Enemies in the Janthir Region",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.4,
    stage_count:    10,
    time_verified:  true,
    tip:            "Any enemies in Lowland Shore or Janthir Syntri count. Enemies are plentiful throughout both maps.",
    waypoint:       "[&BCcPAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  335: {
    // Defeat 10 Enemies in the Castora Region
    title:          "Defeat 10 Enemies in the Castora Region",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 1.3,
    stage_count:    10,
    time_verified:  true,
    tip:            "Hermit Crabs on the beach east of Lilycreek Cascade POI (Breezy Cay) are plentiful and easy.",
    waypoint:       "[&BIkPAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  1: {
    // Complete 3 Events
    title:          "Complete 3 Events",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 2.5,
    stage_count:    3,
    time_verified:  true,
    tip:            "Completes naturally during most other PvE objectives. For a dedicated run: RIBA in the Silverwastes chains many events quickly. Rift hunting gives two event credits per rift. Opening the chest at the end of a jumping puzzle also awards 1 event credit.",
    waypoint:       "[&BH8HAAA=]",
    timed:          false,
    priority:       PRIORITY.LOW,
  },

  62: {
    // Complete a Renown Heart
    title:          "Complete a Renown Heart",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 4,
    stage_count:    1,
    time_verified:  true,
    tip:            "Depends on which expansions you have access to. JW or VoE: buy Local Writs of Renown from a renown vendor to instantly complete their heart. EoD: 'Help Xunlai Jade test and promote jade tech' at [&BBYNAAA=] can be completed by repeatedly getting on and off a Zip Line. PoF: 'Give aid to the refugees at Marifa Camp' at [&BAQKAAA=] is easily completed. LWS4: 'Atholma Farms' at [&BDYLAAA=], stomp the beetle mounds with your springer mount without engaging the beetles.",
    waypoint:       "[&BMwPAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  117: {
    // Participate in 1 Rift Hunt Event
    title:          "Participate in 1 Rift Hunt Event",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 3,
    stage_count:    1,
    time_verified:  true,
    tip:            "Tier 1 Rift events in Skywatch Archipelago are targeted by many people, you're unlikely to be alone.",
    waypoint:       "[&BL4NAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  164: {
    // Catch 5 Fish
    title:          "Catch 5 Fish",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 1,
    stage_count:    5,
    time_verified:  true,
    tip:            "Any open-water fishing spot works. Fishing Village (Village WP, Seitung Province) has open water right nearby. Your JW homestead fishing hole also counts.",
    waypoint:       "[&BJ4MAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  88: {
    // Identify 10 Pieces of Unidentified Gear
    title:          "Identify 10 Pieces of Unidentified Gear",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 2,
    stage_count:    1,
    time_verified:  true,
    tip:            "Buy 10 Pieces of Common Unidentified Gear from the Trading Post and identify them. Do this in the open world as certain instances (Strikes, etc.) can prevent progress from counting.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  65: {
    // Salvage 10 Items
    title:          "Salvage 10 Items",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 2,
    stage_count:    1,
    time_verified:  true,
    tip:            "Buy 10 cheap dyes or Pieces of Common Unidentified Gear from the Trading Post and salvage with a Crude Salvage Kit. Do this in the open world as certain instances (Strikes, etc.) can prevent progress from counting.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  43: {
    // Craft 10 Items
    title:          "Craft 10 Items",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 3,
    stage_count:    1,
    time_verified:  true,
    tip:            "Either combine Essences of Luck as an Artificer, or refine 10 basic materials such as Mithril Ore into Mithril Ingots at any crafting station.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  95: {
    // Harvest 10 Resources with a Harvesting Sickle
    title:          "Harvest 10 Resources with a Harvesting Sickle",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.2,
    stage_count:    10,
    time_verified:  true,
    tip:            "Your guild hall, home instance, or homestead resource nodes are the most convenient. A lettuce farm south of Beetletun WP (Shire of Beetletun, Queensdale) has 8 nodes with more nearby.",
    waypoint:       "[&BPoAAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  79: {
    // Gather 15 Resources with a Logging Axe
    title:          "Gather 15 Resources with a Logging Axe",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.2,
    stage_count:    15,
    time_verified:  true,
    tip:            "Guild hall, home instance, or homestead trees are fastest. Open world: 5 Cypress Saplings near Rayhan Bayt, Malchor's Leap ([&BJ4CAAA=]) or 5 Baoba Saplings south of Gauntlet WP, Mount Maelstrom ([&BNMCAAA=]).",
    waypoint:       "[&BJ4CAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  128: {
    // Gather 15 Resources with a Mining Pick
    title:          "Gather 15 Resources with a Mining Pick",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.2,
    stage_count:    15,
    time_verified:  true,
    tip:            "Guild hall, home instance, or homestead ore nodes are fastest. Open world: Platinum Ore and Rich Platinum Veins around Rata Pten ([&BMQCAAA=]) give 3 resources per node.",
    waypoint:       "[&BMkCAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  115: {
    // Gather 25 Crafting Resources
    title:          "Gather 25 Crafting Resources",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 0.2,
    stage_count:    25,
    time_verified:  true,
    tip:            "A single circuit of your homestead or home instance nodes will often complete this. Remaining nodes can be found in north-east Mount Maelstrom. From Criterion WP, head north-west up the road, then south when the road ends, there are plenty of tree and ore nodes going down through Rata Pten ([&BMQCAAA=]).",
    waypoint:       "[&BMkCAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  350: {
    // Complete a Fractal in the Fractals of the Mists
    title:          "Complete a Fractal in the Fractals of the Mists",
    track:          "PvE",
    acclaim:        10,
    time_per_stage: 7,
    stage_count:    1,
    time_verified:  true,
    tip:            "Any Tier 1 fractal works. Quickplay usually finds a group faster than LFG. The Fractals portal is in Lion's Arch near Fort Marriner.",
    waypoint:       "[&BDAEAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  /* ══════════════════════════════════════════════════════════════
     PvE - WEEKLY (50 acclaim) - Events & Bounties
     ══════════════════════════════════════════════════════════════ */

  57: {
    // Complete 10 Events
    title:          "Complete 10 Events",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 2,
    stage_count:    10,
    time_verified:  true,
    tip:            "Completes naturally during most other PvE objectives. For a dedicated run: RIBA in the Silverwastes chains many events quickly. Rift hunting gives two event credits per rift. Opening the chest at the end of a jumping puzzle also awards 1 event credit.",
    waypoint:       "[&BH8HAAA=]",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.LOW,
  },

  3: {
    // Complete 5 Bounty Missions in Crystal Oasis or Group Events
    title:          "Complete 5 Bounty Missions in Crystal Oasis or Group Events",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 2,
    stage_count:    5,
    time_verified:  true,
    tip:            "Any open-world group event (with other players present) counts. RIBA fortresses in the Silverwastes are fast, easy, and soloable group events. Alternatively, use the Bounty Board at the Amnoon WP ([&BLsKAAA=]). Avoid the Temple of Kormir board as those bounties may not count.",
    waypoint:       "[&BH8HAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  7: {
    // Complete 5 Bounty Missions in Desert Highlands or Group Events
    title:          "Complete 5 Bounty Missions in Desert Highlands or Group Events",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 2,
    stage_count:    5,
    time_verified:  true,
    tip:            "Any open-world group event (with other players present) counts. RIBA fortresses in the Silverwastes are fast, easy, and soloable group events. Alternatively, use the Bounty Board at the Makali Outpost WP ([&BGsKAAA=]).",
    waypoint:       "[&BH8HAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  87: {
    // Complete 5 Bounty Missions in Elon Riverlands or Group Events
    title:          "Complete 5 Bounty Missions in Elon Riverlands or Group Events",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 2,
    stage_count:    5,
    time_verified:  true,
    tip:            "Any open-world group event (with other players present) counts. RIBA fortresses in the Silverwastes are fast, easy, and soloable group events. Alternatively, use the Bounty Board at the Augury's Shadow WP ([&BFMKAAA=]).",
    waypoint:       "[&BH8HAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  121: {
    // Complete 5 Bounty Missions in the Desolation or Group Events
    title:          "Complete 5 Bounty Missions in the Desolation or Group Events",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 2,
    stage_count:    5,
    time_verified:  true,
    tip:            "Any open-world group event (with other players present) counts. RIBA fortresses in the Silverwastes are fast, easy, and soloable group events. Alternatively, use the Bounty Board at the Bonestrand WP ([&BNwKAAA=]).",
    waypoint:       "[&BH8HAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  169: {
    // Complete 5 Bounty Missions in the Domain of Vabbi or Group Events
    title:          "Complete 5 Bounty Missions in the Domain of Vabbi or Group Events",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 2,
    stage_count:    5,
    time_verified:  true,
    tip:            "Any open-world group event (with other players present) counts. RIBA fortresses in the Silverwastes are fast, easy, and soloable group events. Alternatively, use the Bounty Board at the Vehjin Palace WP ([&BO0KAAA=]).",
    waypoint:       "[&BH8HAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  120: {
    // Complete 7 Rift Hunts in Horn of Maguuma or Group Events
    title:          "Complete 7 Rift Hunts in Horn of Maguuma or Group Events",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 3,
    stage_count:    7,
    time_verified:  true,
    tip:            "Complete Tier 1 Rifts in Skywatch Archipelago or check the Weekly Rift Hunting panel for active rift locations. Group events anywhere count as an alternative, so this will probably be mostly complete before getting to it.",
    waypoint:       "[&BL4NAAA=]",
    timed:          false,
    priority:       PRIORITY.LOW,
  },

  347: {
    // Complete 7 Rift Hunts in Castora or Group Events
    title:          "Complete 7 Rift Hunts in Castora or Group Events",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 3,
    stage_count:    7,
    time_verified:  true,
    tip:            "Complete Tier 1 Rifts in Shipwreck Strand, you can pair this with the Linus VoE Chest Farm, which takes about 45 minutes in total. Group events anywhere count as an alternative, so this will probably be mostly complete before getting to it.",
    waypoint:       "[&BJwPAAA=]",
    timed:          false,
    priority:       PRIORITY.LOW,
  },

  352: {
    // Complete 7 Rift Hunts in Janthir or Group Events
    title:          "Complete 7 Rift Hunts in Janthir or Group Events",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 3,
    stage_count:    7,
    time_verified:  true,
    tip:            "Complete Tier 1 Rifts in Janthir Syntri. Group events anywhere count as an alternative, so this will probably be mostly complete before getting to it.",
    waypoint:       "[&BLgOAAA=]",
    timed:          false,
    priority:       PRIORITY.LOW,
  },

  123: {
    // Gather 100 Crafting Resources by Mining, Logging, Fishing, or Harvesting
    title:          "Gather 100 Crafting Resources by Mining, Logging, Fishing, or Harvesting Resource Nodes",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 0.15,
    stage_count:    100,
    time_verified:  true,
    tip:            "A full circuit of a well-stocked guild hall or home instance can complete this in a single run. Outside of this, there are open world node farms. LWS4: Revolution's Heart WP, Thunderhead peaks ([&BKYLAAA=]). Head north from the wp and use a skyscale to follow the volatile magic path up to the eight iron nodes at The Weeping Crest, then continue the path, activate the rift at Sorrow's Cave and move through to The Howling Cliffs for seven platinum nodes. There are five Cypress Saplings near Rayhan Bayt, Malchor's Leap ([&BJ4CAAA=]) which are accessable if the map meta is not running. There are five Cypress Saplings west of Waywarde Waypoint, Straits of Devastation ([&BPgCAAA=]). Five Baoba Saplings are south of Gauntlet WP, Mount Maelstrom ([&BNMCAAA=]). Then, from Criterion WP, Mount Maelstrom ([&BMkCAAA=]), head north-west up the road, then south when the road ends, heading towards Rata Pten ([&BMQCAAA=]), there are plenty of wood and ore nodes in the area.",
    waypoint:       "[&BKYLAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  /* ══════════════════════════════════════════════════════════════
     PvE - WEEKLY (50 acclaim) - Enemy Faction Kills
     ══════════════════════════════════════════════════════════════ */

  5: {
    // Defeat 50 Veteran-Rank Enemies
    title:          "Defeat 50 Veteran-Rank Enemies",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 0.1,
    stage_count:    50,
    time_verified:  true,
    tip:            "Completes naturally during other objectives, but if you want to focus on it, travel to Fort Marriner and enter the Fractal portal, choosing level 4 Urban Battleground. Enter the fractal and turn right just outside the starting tent - waves of low-health veteran enemies constantly spawn here.",
    waypoint:       "[&BDAEAAA=]",
    timed:          false,
    priority:       PRIORITY.LOW,
  },

  135: {
    // Defeat 10 Champion-Rank Enemies
    title:          "Defeat 10 Champion-Rank Enemies",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 1,
    stage_count:    10,
    time_verified:  true,
    tip:            "Shadow Behemoth world boss spawns 15–20 easily tagable Champion Fleshreavers and Shades during its portal phases if the boss is available. If not, travel to Fort Marriner and enter the Fractal portal, choosing any level. Head over the back of the room and speak to the Fractal Instability Trainer, set rank to Champion and spawn 4 idle and 4 moving Champion Mark I Golems. Activate the mistlock instabilities Outflanked and Sugar Rush and ensure you are behind or to the side of your targets, focussing on the moving first. Once these are dead, spawn two more idle Golems to complete.",
    waypoint:       "[&BDAEAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  59: {
    // Defeat 1 Legendary-Rank Enemy
    title:          "Defeat 1 Legendary-Rank Enemy",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  true,
    tip:            "Most world bosses count except for Modniir Ulgoth, Inquest Golem Mk II, and Tequatl. PoF: Bounties marked Legendary on the board count, as well as completing the Shiverpeaks Pass raid encounter.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.HIGH,
  },

  150: {
    // Defeat Awakened or Risen
    title:          "Defeat Awakened or Risen",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 0.1,
    stage_count:    50,
    time_verified:  true,
    tip:            "LWS4: Activate Chapter 3 story (Be My Guest) and enter south-west of Apizmic Grounds WP. Begin the mission and head across the bridge killing Awakened as you go - you should hit 50 by the time Canach blows open the doors. PoF: Bonestrand Garrison ([&BKcKAAA=]) has dense Awakened including veterans - interact with Vizier's Propaganda posters to spawn more. Core: Risen fill Orr maps (Straits of Devastation, Malchor's Leap, Cursed Shore).",
    waypoint:       "[&BFALAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  70: {
    // Defeat Mordrem or Nightmare Court
    title:          "Defeat Mordrem or Nightmare Court",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 0.1,
    stage_count:    50,
    time_verified:  true,
    tip:            "HoT: From the waypoint, travel southeast on the surface layer road towards Gnarled Roots ([&BOcHAAA=]). Southeast of the PoI, look for a stream leading into a cave. There is a Hero Point directly above marking the entrance. Inside are many easy to kill Mordrem Maggots with a short respawn time, and they split into two twice when defeated, giving a total of 7 kills each. Core: Nightmare Court appear in Caledon Forest and the Twilight Arbor dungeon.",
    waypoint:       "[&BA4IAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  77: {
    // Defeat Void Enemies or Sons of Svanir
    title:          "Defeat Void Enemies or Sons of Svanir",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 0.1,
    stage_count:    50,
    time_verified:  true,
    tip:            "EoD: Complete the Trial of the Elders mini-dungeon at Sanctuary of Ione - if you reset at 7 stacks of Elder's Plight, you can clear this quickly in two runs. Core: Sons of Svanir respawn quickly between Highpeaks WP ([&BIICAAA=]), Claw Watch and Ridgepoint Sentry in Frostgorge Sound",
    waypoint:       "[&BEgNAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  143: {
    // Defeat Jade Mechs or Inquest
    title:          "Defeat Jade Mechs or Inquest",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 0.1,
    stage_count:    50,
    time_verified:  true,
    tip:            "LWS4: Head to the bottom of Rata Primus, Sandswept Isles for large groups of Inquest - especially around Magistorm Gallery ([&BCgLAAA=]). VoE: Groups of Inquest can be found under and around Riddled Cove ([&BIMPAAA=]) and Guarded Glades ([&BIkPAAA=]), Shipwreck Strand. Jade Mechs are found throughout EoD maps.",
    waypoint:       "[&BCULAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  190: {
    // Defeat Kryptis or Bandits
    title:          "Defeat Kryptis or Bandits",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 0.1,
    stage_count:    50,
    time_verified:  true,
    tip:            "Many groups of Bandits are found around Breean's Bandits, Brisban Wildlands ([&BFUAAAA=]).",
    waypoint:       "[&BGEAAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  193: {
    // Defeat Forged or Flame Legion
    title:          "Defeat Forged or Flame Legion",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 0.1,
    stage_count:    50,
    time_verified:  true,
    tip:            "Head to to Fort Marriner and enter the Fractal portal, choosing level 15 Thaumanova Reactor. Enter the fractal and head forward after the wall explodes, dropping down to the bottom area. Here there is a field of infinetely respawning Flame Legion enemies.",
    waypoint:       "[&BDAEAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  272: {
    // Defeat Titanspawn or Elemental Enemies
    title:          "Defeat Titanspawn or Elemental Enemies",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 0.2,
    stage_count:    50,
    time_verified:  true,
    tip:            "The best target here, if it is active, is the 'Get an extinguisher from Engineer Kayle Brightshock and put out fires' event in Sati Passage, Fireheart Rise. It is important that you NEVER use the extinguisher, as it reduces the number of elemental spawns - you should just move between the respawns as they occur. JW: Titanspawn are most numerous on Tier 1 Rifts, and Lowland Shore ([&BCcPAAA=]) has many potential spawn points close to each other.",
    waypoint:       "[&BBgCAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  334: {
    // Defeat Inquest Enemies or Pirates
    title:          "Defeat Inquest Enemies or Pirates",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 0.1,
    stage_count:    50,
    time_verified:  true,
    tip:            "LWS4: Head to the bottom of Rata Primus, Sandswept Isles for large groups of Inquest - especially around Magistorm Gallery ([&BCgLAAA=]). VoE: Groups of Inquest can be found under and around Riddled Cove ([&BIMPAAA=]) and Guarded Glades ([&BIkPAAA=]), Shipwreck Strand. Core: Inquest appear in Metrica Province and Level 15 Thaumanova Reactor Fractal, pirates (Consortium/bandit crews) are found in Southsun Cove and Kessex Hills.",
    waypoint:       "[&BCgLAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  /* ══════════════════════════════════════════════════════════════
     PvE - WEEKLY (50 acclaim) - World Boss Events
     ══════════════════════════════════════════════════════════════ */

  358: {
    // Defeat Tequatl the Sunless or Complete Events in Sparkfly Fen
    title:          "Defeat Tequatl the Sunless or Complete Events in Sparkfly Fen",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  true,
    tip:            "Prioritise the Tequatl fight - it's the fastest completion and well-organised on most servers. Arrive 5 minutes early at the Splintered Coast. If you miss the window, completing events in Sparkfly Fen works but takes much longer.",
    waypoint:       "[&BNABAAA=]",
    timed:          true,
    schedule:       ["00:00", "03:00", "07:00", "11:30", "16:00", "19:00"],
    priority:       PRIORITY.HIGH,
  },

  60: {
    // Defeat the Shadow Behemoth World Boss or Complete Events in Queensdale
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:8, every 2h at 1:45)
    title:          "Defeat the Shadow Behemoth World Boss or Complete Events in Queensdale",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  true,
    tip:            "Shadow Behemoth spawns every 2 hours in Godslost Swamp, Queensdale. Arrive a few minutes before the event starts. Note: this fight also spawns Champion Fleshreavers during its portal phases, useful for the Defeat 10 Champions objective. Queensdale events count as an alternative if you miss the window, but are not recommended as they take much longer.",
    waypoint:       "[&BPcAAAA=]",
    timed:          true,
    schedule:       ["01:45","03:45","05:45","07:45","09:45","11:45","13:45","15:45","17:45","19:45","21:45","23:45"],
    priority:       PRIORITY.HIGH,
  },

  178: {
    // Defeat the Svanir Shaman Chief World Boss or Complete Events in Wayfarer Foothills
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:2, every 2h at :15)
    title:          "Defeat the Svanir Shaman Chief World Boss or Complete Events in Wayfarer Foothills",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 12,
    stage_count:    1,
    time_verified:  true,
    tip:            "Svanir Shaman Chief spawns every 2 hours in Wayfarer Foothills. Arrive a few minutes earlier than the timer indicates. If you miss the window, events in Wayfarer Foothills near the starting area count as an alternative, but are not recommended as they take much longer.",
    waypoint:       "[&BMIDAAA=]",
    timed:          true,
    schedule:       ["00:15","02:15","04:15","06:15","08:15","10:15","12:15","14:15","16:15","18:15","20:15","22:15"],
    priority:       PRIORITY.HIGH,
  },

  55: {
    // Defeat the Fire Elemental World Boss or Complete Events in Metrica Province
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:4, every 2h at :45)
    title:          "Defeat the Fire Elemental World Boss or Complete Events in Metrica Province",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  true,
    tip:            "Fire Elemental spawns every 2 hours near the Thaumanova Reactor in Metrica Province. Arrive a few minutes earlier than the timer indicates. Metrica Province events around the reactor area count as an alternative, but are not recommended as they take much longer.",
    waypoint:       "[&BEcAAAA=]",
    timed:          true,
    schedule:       ["00:45","02:45","04:45","06:45","08:45","10:45","12:45","14:45","16:45","18:45","20:45","22:45"],
    priority:       PRIORITY.HIGH,
  },

  134: {
    // Defeat the Megadestroyer World Boss or Complete Events in Mount Maelstrom
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:3, every 3h at :30)
    title:          "Defeat the Megadestroyer World Boss or Complete Events in Mount Maelstrom",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  true,
    tip:            "Megadestroyer spawns every 3 hours in Mount Maelstrom. Arrive a few minutes earlier than the timer indicates. Mount Maelstrom events around the volcanic region count as an alternative, but are not recommended as they take much longer.",
    waypoint:       "[&BM0CAAA=]",
    timed:          true,
    schedule:       ["00:30","03:30","06:30","09:30","12:30","15:30","18:30","21:30"],
    priority:       PRIORITY.HIGH,
  },

  159: {
    // Defeat the Inquest Golem Mark II World Boss or Complete Events in Mount Maelstrom
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:10, every 3h at :00 offset 2h)
    title:          "Defeat the Inquest Golem Mark II World Boss or Complete Events in Mount Maelstrom",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "Inquest Golem Mk II spawns every 3 hours in Mount Maelstrom. Arrive a few minutes earlier than the timer indicates. Note: this boss does NOT count for the Defeat 1 Legendary-Rank Enemy objective. Mount Maelstrom events count as an alternative,  but are not recommended as they take much longer.",
    waypoint:       "[&BNQCAAA=]",
    timed:          true,
    schedule:       ["02:00","05:00","08:00","11:00","14:00","17:00","20:00","23:00"],
    priority:       PRIORITY.HIGH,
  },

  196: {
    // Defeat the Shatterer World Boss or Complete Events in Blazeridge Steppes
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:5, every 3h at 1:00)
    title:          "Defeat the Shatterer World Boss or Complete Events in Blazeridge Steppes",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "The Shatterer spawns every 3 hours in the Lowland Burns area of Blazeridge Steppes. Arrive a few minutes earlier than the timer indicates. Blazeridge Steppes events count as an alternative, but are not recommended as they take much longer.",
    waypoint:       "[&BE4DAAA=]",
    timed:          true,
    schedule:       ["01:00","04:00","07:00","10:00","13:00","16:00","19:00","22:00"],
    priority:       PRIORITY.HIGH,
  },

  19: {
    // Defeat the Claw of Jormag World Boss or Complete Events in Frostgorge Sound
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:9, every 3h at 2:30)
    title:          "Defeat the Claw of Jormag World Boss or Complete Events in Frostgorge Sound",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  true,
    tip:            "Claw of Jormag spawns every 3 hours in Frostgorge Sound. Arrive a few minutes earlier than the timer indicates. Frostgorge Sound events count as an alternative, but are not recommended as they take much longer.",
    waypoint:       "[&BHoCAAA=]",
    timed:          true,
    schedule:       ["02:30","05:30","08:30","11:30","14:30","17:30","20:30","23:30"],
    priority:       PRIORITY.HIGH,
  },

  31: {
    // Defeat the Great Jungle Wurm World Boss or Complete Events in Caledon Forest
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:6, every 2h at 1:15)
    title:          "Defeat the Great Jungle Wurm World Boss or Complete Events in Caledon Forest",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "Great Jungle Wurm spawns every 2 hours in the Twilight Arbor area of Caledon Forest. Arrive a few minutes earlier than the timer indicates. Caledon Forest events count as an alternative, but are not recommended as they take much longer.",
    waypoint:       "[&BEEFAAA=]",
    timed:          true,
    schedule:       ["01:15","03:15","05:15","07:15","09:15","11:15","13:15","15:15","17:15","19:15","21:15","23:15"],
    priority:       PRIORITY.HIGH,
  },

  /* ══════════════════════════════════════════════════════════════
     PvE - WEEKLY (50 acclaim) - Meta-Event or Zone Events
     ══════════════════════════════════════════════════════════════ */

  348: {
    // Complete a Meta-Event or Events in the Crystal Desert or Events in Kryta
    title:          "Complete a Meta-Event or Events in the Crystal Desert or Events in Kryta",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "The timer here is for the next eligible PoF meta between 'Path to Ascension', 'Maws of Torment' or 'Forged with Fire' - type \'/wiki et\' in-game to find which one it is . LWS4: Most Dragonfall events count as meta and might be a little faster if a meta isn't about to be active. Core: RIBA in the Silverwastes chains many events quickly, though it will likely be slower doing fifteen events there compared to one in Dragonfall or PoF.",
    waypoint:       null,
    timed:          true,
    schedule:       [
      // ×:00 every hour — Forged with Fire (Domain of Vabbi, every 60 min)
      // ×:00 odd hours  — Maws of Torment (The Desolation, every 120 min from 01:00)
      // ×:30 odd hours  — Path to Ascension (Elon Riverlands, every 120 min from 01:30)
      "00:00", "01:00", "01:30",
      "02:00", "03:00", "03:30",
      "04:00", "05:00", "05:30",
      "06:00", "07:00", "07:30",
      "08:00", "09:00", "09:30",
      "10:00", "11:00", "11:30",
      "12:00", "13:00", "13:30",
      "14:00", "15:00", "15:30",
      "16:00", "17:00", "17:30",
      "18:00", "19:00", "19:30",
      "20:00", "21:00", "21:30",
      "22:00", "23:00", "23:30",
    ],
    priority:       PRIORITY.HIGH,
  },

  344: {
    // Complete a Meta-Event or Events in Cantha or Events in Maguuma Jungle
    title:          "Complete a Meta-Event or Events in Cantha or Events in Maguuma Jungle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 25,
    stage_count:    1,
    time_verified:  true,
    tip:            "EoD meta-events (Aetherblade Assault, Kaineng Blackout, Gang War of Echovald) have timers below - type \'/wiki et\' in-game to find which one is on. Battle for the Jade Sea also counts, but you'll be better off waiting Aetherblade Assault to start. Alternatively, complete fifteen RIBA events in the Silverwastes.",
    waypoint:       null,
    timed:          true,
    schedule:       [
      "00:00","00:30","01:00","01:30",
      "02:00","02:30","03:00","03:30",
      "04:00","04:30","05:00","05:30",
      "06:00","06:30","07:00","07:30",
      "08:00","08:30","09:00","09:30",
      "10:00","10:30","11:00","11:30",
      "12:00","12:30","13:00","13:30",
      "14:00","14:30","15:00","15:30",
      "16:00","16:30","17:00","17:30",
      "18:00","18:30","19:00","19:30",
      "20:00","20:30","21:00","21:30",
      "22:00","22:30","23:00","23:30",
    ],
    priority:       PRIORITY.HIGH,
  },

  345: {
    // Complete a Meta-Event or Events in Horn of Maguuma or Events in Shiverpeak Mountains
    title:          "Complete a Meta-Event or Events in Horn of Maguuma or Events in Shiverpeak Mountains",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 25,
    stage_count:    1,
    time_verified:  true,
    tip:            "The timer is set for the two timed SotO metas - type \'/wiki et\' in-game to find which one it is. Inner Nayos metas also count, and it might be quicker to start and finish any of those three instead of waiting for the timed metas. Completing fifteen standard events in Wayfarer Foothills, Lornar's Pass, or Frostgorge Sound also count, but will take a lot longer.",
    waypoint:       null,
    timed:          true,
    schedule:       [
      "00:00","01:00","02:00","03:00",
      "04:00","05:00","06:00","07:00",
      "08:00","09:00","10:00","11:00",
      "12:00","13:00","14:00","15:00",
      "16:00","17:00","18:00","19:00",
      "20:00","21:00","22:00","23:00",
    ],
    priority:       PRIORITY.HIGH,
  },

  364: {
    // Complete a Meta-Event or Events in Castora or Events in Orr
    title:          "Complete a Meta-Event or Events in Castora or Events in Orr",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 25,
    stage_count:    1,
    time_verified:  true,
    tip:            "Timer is set for the next Castora meta-event - type \'/wiki et\' in-game to find which one it is. Otherwise, head to Orr (Straits of Devastation, Malchor's Leap, Cursed Shore) for frequent chain events around the temple areas.",
    waypoint:       null,
    timed:          true,
    schedule:       [
      "00:40",
      "01:40","02:40","03:40","04:40",
      "05:40","06:40","07:40","08:40",
      "09:40","10:40","11:40","12:40",
      "13:40","14:40","15:40","16:40",
      "17:40","18:40","19:40","20:40",
      "21:40","22:40","23:40",
    ],
    priority:       PRIORITY.HIGH,
  },

  365: {
    // Complete a Meta-Event or Events in Janthir or Events in Orr
    title:          "Complete a Meta-Event or Events in Janthir or Events in Orr",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 25,
    stage_count:    1,
    time_verified:  true,
    tip:            "Timer is set for the two timed Janthir Wilds meta-events - type \'/wiki et\' in-game to find which one it is. Otherwise, head to Orr (Straits of Devastation, Malchor's Leap, Cursed Shore) for frequent chain events around the temple areas.",
    waypoint:       null,
    timed:          true,
    schedule:       [
      "00:30","01:20","02:30","03:20",
      "04:30","05:20","06:30","07:20",
      "08:30","09:20","10:30","11:20",
      "12:30","13:20","14:30","15:20",
      "16:30","17:20","18:30","19:20",
      "20:30","21:20","22:30","23:20",
    ],
    priority:       PRIORITY.HIGH,
  },

  367: {
    // Complete a Meta-Event or Events in Heart of Maguuma or Events in Ascalon
    title:          "Complete a Meta-Event or Events in Heart of Maguuma or Events in Ascalon",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  true,
    tip:            "The timer shows the next HoT meta-event, aside from Dragon's Stand, which is much slower (you should do Night and the Enemy instead) - type \'/wiki et\' in-game to find which one it is. Completing fifteen events in Ascalon maps (Plains of Ashford, Diessa Plateau, Iron Marches, Blazeridge Steppes, Fields of Ruin) are an alternative.",
    waypoint:       null,
    timed:          true,
    schedule:       [
      "00:00","00:30","01:00","01:45",
      "02:30","03:00","03:45","04:30",
      "05:00","05:45","06:30","07:00",
      "07:45","08:30","09:00","09:45",
      "10:30","11:00","11:45","12:30",
      "13:00","13:45","14:30","15:00",
      "15:45","16:30","17:00","17:45",
      "18:30","19:00","19:45","20:30",
      "21:00","21:45","22:30","23:00",
    ],
    priority:       PRIORITY.HIGH,
  },

  /* ══════════════════════════════════════════════════════════════
     PvE - WEEKLY (50 acclaim) - Jumping Puzzles
     ══════════════════════════════════════════════════════════════ */

  56: {
    // Complete the Dark Reverie Jumping Puzzle
    title:          "Complete the Dark Reverie Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  true,
    tip:            "Dark Reverie is in Caledon Forest, immediately following the Morgan's Spiral JP. Moderate difficulty - allow extra time if unfamiliar. Skyscale can help you skip Morgan's Spiral, check guides on YouTube. Check the GW2 wiki for a step-by-step guide of both jumping puzzles. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BDUBAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  38: {
    // Complete the Shattered Ice Ruins Jumping Puzzle
    title:          "Complete the Shattered Ice Ruins Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "Shattered Ice Ruins is in Shattered Ice Floe. You can skip most of the puzzle by scaling the large southern ice wall with a Skyscale, Springer, or upgraded Jade Bot Glide Booster. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BH4CAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  74: {
    // Complete the Branded Mine Jumping Puzzle
    title:          "Complete the Branded Mine Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "Branded Mine is in Dragonrot Domains. From Tenaebron WP, head west to the Renown Heart NPC, then follow the path south, the opening to the jumping puzzle is on your right, surrounded by jagged branded rocks and is just south of a red plant. Check the wiki or YouTube for the route when inside and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BNcAAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  129: {
    // Complete the Grendich Gamble Jumping Puzzle
    title:          "Complete the Grendich Gamble Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 5,
    stage_count:    1,
    time_verified:  true,
    tip:            "Grendich Gamble is in The Blasted Moors, Diessa Plateau. A relatively straightforward Charr-ruins puzzle, it can be skipped entirely with a timed launch with Bond of Faith from a Skyscale. Check the wiki for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BNoAAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  130: {
    // Complete the Spekk's Laboratory Jumping Puzzle
    title:          "Complete the Spekk\'s Laboratory Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "Spekk's Laboratory is in Sandycove Beach, north-north-west of Gleaner's Cove WP, Caledon Forest. Each control panel you touch acts as a waypoint, if you fall, just speak to a Lab Assistant to teleport back up. Check the wiki for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BDcBAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  186: {
    // Complete the Professor Portmatt's Lab Jumping Puzzle
    title:          "Complete the Professor Portmatt\'s Lab Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "Professor Portmatt's Lab is underwater in Sorrowful Sound, Gendarran Fields. The chest at the end can be reached quickly with a Skyscale + Bond of Faith. Check the wiki for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BKQBAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  189: {
    // Complete the Fawcett's Bounty Jumping Puzzle
    title:          "Complete the Fawcett\'s Bounty Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "Fawcett's Bounty is in Arcallion Digs, Harathi Hinterlands. Head north and west out of Arcallion Digs. Swim across the lake to the west, looking for a path on the north shore, just to the left of a small waterfall trickling out of the rocks. Head up the path and interact with the gate to enter. Check the wiki for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BMMAAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  180: {
    // Complete the Antre of Adjournment Jumping Puzzle
    title:          "Complete the Antre of Adjournment Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "Antre of Adjournment is in the Valley of Lyss, Straits of Devastation. From Pagga's Waypoint, head west to the bridge and jump off the north side, the entrance is on your right. Check the wiki for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BKYCAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  101: {
    // Complete the Retrospective Runaround Jumping Puzzle
    title:          "Complete the Retrospective Runaround Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  true,
    tip:            "Retrospective Runaround is in the Northeastern Silverwastes (Drydock Grotto WP). Collect all 9 stacks of the Milestone buff - no final chest needed. Check the wiki for milestone locations guide and allow extra time if unfamiliar.",
    waypoint:       "[&BLoHAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  156: {
    // Complete the Weyandt's Revenge Jumping Puzzle
    title:          "Complete the Weyandt\'s Revenge Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  true,
    tip:            "Weyandt's Revenge is in Farshore Ward, Lion's Arch, behind Tokk's Mill. Check the wiki for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended. Note: completing this puzzle does not award a free event credit.",
    waypoint:       "[&BDMEAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  161: {
    // Complete the Skipping Stones Jumping Puzzle
    title:          "Complete the Skipping Stones Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  true,
    tip:            "Skipping Stones is in Southsun Shoals, Southsun Cove. Head west on a Skimmer, then use Skyscale with Bond of Faith to reach the island's north side. Run clockwise around the island and over a bridge to the chest. Check the wiki for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BNAGAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  4: {
    // Complete the Chaos Crystal Cavern Jumping Puzzle
    title:          "Complete the Chaos Crystal Cavern Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  true,
    tip:            "Chaos Crystal Cavern is in Champion's Shield, Iron Marches. Travel west from the waypoint to a cliff with some Cliff Bats on it. Jump up the cliff, then down the large hole to the south. Check the wiki for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BOQBAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  148: {
    // Complete the Pig Iron Quarry Jumping Puzzle
    title:          "Complete the Pig Iron Quarry Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "Pig Iron Quarry is in Champion's Shield, Iron Marches. The end is easily reachable with Skyscale + Bond of Faith for a quick event credit alongside the puzzle completion. Check the wiki for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BBkCAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  146: {
    // Complete the Crimson Plateau Jumping Puzzle
    title:          "Complete the Crimson Plateau Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "Crimson Plateau is in Reaper's Corridor, Dissa Plateau. It is reachable with Skyscale + Bond of Faith from the south. Check the wiki for the exact location or for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BMYDAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  40: {
    // Complete the Collapsed Observatory Jumping Puzzle
    title:          "Complete the Collapsed Observatory Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  true,
    tip:            "Collapsed Observatory is in Cereboth Canyon, Kessex Hills. Follow the nearby stream south into the cavern. Check the wiki for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BBIAAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  44: {
    // Complete the Loreclaw Expanse Jumping Puzzle
    title:          "Complete the Loreclaw Expanse Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "Loreclaw Expanse is in Planes of Ashford, from the WP head southeast and climb the cliff, heading east into the cave. Check the wiki for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BMcDAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  61: {
    // Complete the Not So Secret Jumping Puzzle
    title:          "Complete the Not So Secret Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  true,
    tip:            "Not So Secret is in Broadhollow Bluffs, Gendarran Fields - travel southeast from the WP then south, scaling the cliffs with the jump pads or a Skyscale to get in. This JP is generally considered the longest in Core Tyria. A Springer or Skyscale significantly help with cutting out most of the puzzle - search for Not So Secret shortcuts on YouTube. Check the wiki for the route and allow around 1-2 hours if unfamiliar with the route and not taking a shortcut. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is highly recommended.",
    waypoint:       "[&BOEAAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  105: {
    // Complete the Coddler's Cove Jumping Puzzle
    title:          "Complete the Coddler\'s Cove Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  true,
    tip:            "Coddler's Cove is in Mellaggan's Grotto, Timberline Falls. From the WP, head south to the cliff and follow it southwest around to the entrance. Check the wiki for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BEYCAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  116: {
    // Complete the Tribulation Caverns Jumping Puzzle
    title:          "Complete the Tribulation Caverns Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "The entrance to Tribulation Caverns JP is in Tribulation Rift, Dredgehaunt Cliffs. The JP follows on from the Tribulation Rift Scaffholding JP, and that JP can be skipped with a Skyscale or Springer on the south tip of the subzone. Check the wiki for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BD8FAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  170: {
    // Complete the Behem Gauntlet Jumping Puzzle
    title:          "Complete the Behem Gauntlet Jumping Puzzle",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  true,
    tip:            "The Behem Gauntlet JP is found in the subzone of the same name in Blazeridge Steppes. Follow the road southeast into the cave. Check the wiki for the route and allow extra time if unfamiliar. Alternatively, if there is a player with commander tag up at the end of the puzzle, you can join their group and use a Teleport to Friend to skip the entire thing - mailing a tip to the commander is recommended.",
    waypoint:       "[&BP0BAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  /* ══════════════════════════════════════════════════════════════
     PvE - WEEKLY - Fractals, Raids, Strikes
     ══════════════════════════════════════════════════════════════ */

  45: {
    // Complete Any Raid Encounter
    title:          "Complete Any Raid Encounter",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  true,
    tip:            "Any single raid encounter on any wing or strike counts. Easy options are to use Raid Quickplay LFG (Looking for Group → Raids → Raids (Training)), use LFG to find a group for one of the four daily encounters, or join an IBS5 group.",
    waypoint:       "[&BCAJAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  47: {
    // Identify 100 Pieces of Unidentified Gear
    title:          "Identify 100 Pieces of Unidentified Gear",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 2,
    stage_count:    1,
    time_verified:  true,
    tip:            "Buy 100 Pieces of Common Unidentified Gear from the Trading Post (Fine / Masterwork bags are cheapest), then use 'Identify All' from your inventory in one go. Do this in open world - some instances prevent progress from counting.",
    waypoint:       "[&BBAEAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  100: {
    // Salvage 50 Items
    title:          "Salvage 50 Items",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 2,
    stage_count:    1,
    time_verified:  true,
    tip:            "Buy 50 cheap dyes or Pieces of Common Unidentified Gear from the Trading Post and salvage with a Crude Salvage Kit.",
    waypoint:       "[&BBAEAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  63: {
    // Complete 3 Fractals in the Fractals of the Mists
    title:          "Complete 3 Fractals in the Fractals of the Mists",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 7,
    stage_count:    3,
    time_verified:  true,
    tip:            "Complete three tier 1 fractals via Quickplay. The Fractals portal is in Lion's Arch near Fort Marriner.",
    waypoint:       "[&BDAEAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  269: {
    // Complete a Convergence or Fractal
    title:          "Complete a Convergence or Fractal",
    track:          "PvE",
    acclaim:        50,
    time_per_stage: 8,
    stage_count:    5,
    time_verified:  true,
    tip:            "Complete five tier 1 fractals via Quickplay, the Fractals portal is in Lion's Arch near Fort Marriner. If you want to do a convergence instead, public groups run every 90 minutes, alternating between Mount Balrior and Outer Nayos.",
    waypoint:       "[&BDAEAAA=]",
    timed:          false,
    // schedule:       ["00:00","01:30","03:00","04:30","06:00","07:30","09:00","10:30","12:00","13:30","15:00","16:30","18:00","19:30","21:00","22:30"],
    priority:       PRIORITY.NORMAL,
  },

  /* ══════════════════════════════════════════════════════════════
     PvE - SPECIAL / SEASONAL (higher acclaim)
     ══════════════════════════════════════════════════════════════ */

  346: {
    // Collect 4 Spears from an Alliance Field Quartermaster (150 acclaim)
    title:          "Collect 4 Spears from an Alliance Field Quartermaster",
    track:          "PvE",
    acclaim:        150,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  true,
    tip:            "Alliance Field Quartermasters are found in Visions of Eternity maps. Check the wiki for Quartermaster locations.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  349: {
    // Complete 5 Quickplay Raids (300 acclaim)
    title:          "Complete 5 Quickplay Raids",
    track:          "PvE",
    acclaim:        300,
    time_per_stage: 10,
    stage_count:    5,
    time_verified:  true,
    tip:            "Queue for Quickplay Raids from the group content panel. Each run takes roughly 10 minutes depending on group composition and encounter.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  351: {
    // Complete the Guardian's Glade Raid or 10 Quickplay Raids (300 acclaim)
    title:          "Complete the Guardian\'s Glade Raid or 10 Quickplay Raids",
    track:          "PvE",
    acclaim:        300,
    time_per_stage: 10,
    stage_count:    10,
    time_verified:  true,
    tip:            "Guardian's Glade is a raid encounter from Visions of Eternity. A single clear is likely faster than 10 Quickplay Raids for an experienced group, but LFG is quicker if you are solo and can't easily find a group.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  357: {
    // Complete 5 Quickplay Fractals (150 acclaim)
    title:          "Complete 5 Quickplay Fractals",
    track:          "PvE",
    acclaim:        150,
    time_per_stage: 8,
    stage_count:    5,
    time_verified:  true,
    tip:            "Complete five tier 1 fractals via Quickplay, the Fractals portal is in Lion's Arch near Fort Marriner.",
    waypoint:       "[&BDAEAAA=]",
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

 
  355: {
    // Complete 30 Events in Castora (150 acclaim)
    title:          "Complete 30 Events in Castora",
    track:          "PvE",
    acclaim:        150,
    time_per_stage: 4,
    stage_count:    30,
    time_verified:  true,
    tip:            "Complete 30 events specifically in the Castora region. Rift hunting in Castora gives 2 event credits per rift and is likely the most efficient approach.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  356: {
    // Collect Any 1 Mini Kela, Mini Sebb, or Mini Dancing Crab (75 acclaim)
    time_per_stage: 5,
    stage_count:    1,
    time_verified:  true,
    tip:            "These minis are from Visions of Eternity. Check the wiki for how to obtain them.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  360: {
    // Complete 15 Repeatable Renown Hearts in Castora (150 acclaim)
    title:          "Complete 15 Repeatable Renown Hearts in Castora",
    track:          "PvE",
    acclaim:        150,
    time_per_stage: 10,
    stage_count:    15,
    time_verified:  true,
    tip:            "Complete 15 repeatable renown hearts in the Castora region - they reset daily.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  361: {
    // Collect 4 Relics from Visions of Eternity Set 2 (150 acclaim)
    // ⚠️ VERIFY: SotO content
    title:          "Collect 4 Relics from Visions of Eternity Set 2",
    track:          "PvE",
    acclaim:        150,
    time_per_stage: 30,
    stage_count:    4,
    time_verified:  true,
    tip:            "Check the wiki for the current set composition and relic sources.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  362: {
    // Unlock Any 10 Item Skins (150 acclaim)
    // ⚠️ VERIFY: exact count against your API progress_complete
    title:          "Unlock Any 10 Item Skins",
    track:          "PvE",
    acclaim:        150,
    time_per_stage: 5,
    stage_count:    1,
    time_verified:  true,
    tip:            "Buy 10 inexpensive items from the Trading Post and unlock their skins (right-click → Unlock Skin), or unlock skins through normal gameplay. Salvage-unlocked skins also count.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  363: {
    // Complete 4 Meta-Events in Castora (150 acclaim)
    // ⚠️ VERIFY time estimate
    title:          "Complete 4 Meta-Events in Castora",
    track:          "PvE",
    acclaim:        150,
    time_per_stage: 25,
    stage_count:    4,
    time_verified:  true,
    tip:            "Complete 4 meta-events in the Castora region maps. Use '/wiki et' and check Castora meta schedules and plan your session around both meta windows.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  366: {
    // Speak with Shaman Palak about the Endless Summer Legendary Ring (75 acclaim)
    // ⚠️ VERIFY: seasonal/Living Story content
    title:          "Speak with Shaman Palak about the Endless Summer Legendary Ring",
    track:          "PvE",
    acclaim:        75,
    time_per_stage: 5,
    stage_count:    1,
    time_verified:  true,
    tip:            "Check the wiki for their location and any prerequisites.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  /* ══════════════════════════════════════════════════════════════
     WvW - DAILY (10 acclaim)
     ══════════════════════════════════════════════════════════════ */

  98: {
    // Earn 200 WvW Experience
    title:          "Earn 200 WvW Experience",
    track:          "WvW",
    acclaim:        10,
    time_per_stage: 12,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Earned from any WvW activity - capturing objectives, killing NPCs or players, and completing events. A single camp capture typically provides enough.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  99: {
    // Capture 1 Camp Objective in WvW
    title:          "Capture 1 Camp Objective in World vs. World",
    track:          "WvW",
    acclaim:        10,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Supply camps are the smallest and most accessible WvW objectives. Look for undefended enemy-held camps on any borderland or Eternal Battlegrounds map.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  107: {
    // Capture 1 Sentry Point in WvW
    title:          "Capture 1 Sentry Point in World vs. World",
    track:          "WvW",
    acclaim:        10,
    time_per_stage: 5,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Sentry points are small guard posts scattered throughout WvW maps. They require only a few NPC kills to capture and are usually uncontested.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  139: {
    // Capture 1 Ruin or Shrine Objective in WvW
    title:          "Capture 1 Ruin or Shrine Objective in World vs. World",
    track:          "WvW",
    acclaim:        10,
    time_per_stage: 8,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Ruins are found in Desert Borderlands; shrines in Alpine Borderlands. Both are smaller than towers or keeps and faster to flip.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  155: {
    // Defeat 3 Enemy Invaders in WvW
    title:          "Defeat 3 Enemy Invaders in World vs. World",
    track:          "WvW",
    acclaim:        10,
    time_per_stage: 8,
    stage_count:    3,
    time_verified:  false,
    tip:            "[WvW] Engage enemy players in any WvW map. Roaming near frequently contested supply camps or sentry points gives reliable opportunities.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  187: {
    // Defeat 5 Enemy Guards in WvW
    title:          "Defeat 5 Enemy Guards in World vs. World",
    track:          "WvW",
    acclaim:        10,
    time_per_stage: 2,
    stage_count:    5,
    time_verified:  false,
    tip:            "[WvW] Enemy NPC guards protect all objectives. Attacking any enemy-held camp or tower clears guards - combine naturally with a capture objective.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  202: {
    // Escort 1 Supply Caravan to Its Destination in WvW
    title:          "Escort 1 Supply Caravan to Its Destination in World vs. World",
    track:          "WvW",
    acclaim:        10,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Supply caravans (dolyaks) move automatically between supply camps and objectives. Stay near the dolyak and defend it until it arrives at its destination.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  28: {
    // Defeat 1 Enemy Supply Caravan in WvW
    title:          "Defeat 1 Enemy Supply Caravan in World vs. World",
    track:          "WvW",
    acclaim:        10,
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Enemy dolyaks travel along fixed paths between objectives. Intercept one on a route through enemy territory and kill it before it arrives.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  10: {
    // Participate in 1 Defense Event in WvW
    title:          "Participate in 1 Defense Event in World vs. World",
    track:          "WvW",
    acclaim:        10,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Defense events trigger when an enemy attacks a friendly objective. Join a map with active siege and respond to defense callouts. Brief participation before the event resolves should be enough for credit.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  353: {
    // Deal 50,000 Damage Using Siege Equipment in WvW
    title:          "Deal 50,000 Damage Using Siege Equipment",
    track:          "WvW",
    acclaim:        10,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Operate any siege weapon (Arrow Cart, Ballista, Trebuchet, Catapult, Cannon) during an attack or defense. Arrow Carts against a rushing enemy accumulate damage quickly.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  /* ══════════════════════════════════════════════════════════════
     WvW - WEEKLY (50 acclaim)
     ══════════════════════════════════════════════════════════════ */

  166: {
    // Earn 10,000 WvW Experience
    title:          "Earn 10,000 WvW Experience",
    track:          "WvW",
    acclaim:        50,
    time_per_stage: 60,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Accumulated across a full WvW session. An active hour of capturing objectives, killing players and NPCs, and participating in events should be sufficient.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  46: {
    // Capture 10 WvW Objectives
    title:          "Capture 10 World vs. World Objectives",
    track:          "WvW",
    acclaim:        50,
    time_per_stage: 8,
    stage_count:    10,
    time_verified:  false,
    tip:            "[WvW] Capture any combination of camps, towers, keeps, or castles. Joining an offensive zerg during an active push is the fastest way to chain captures.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  181: {
    // Capture 5 Camps in WvW
    title:          "Capture 5 Camps in World vs. World",
    track:          "WvW",
    acclaim:        50,
    time_per_stage: 8,
    stage_count:    5,
    time_verified:  false,
    tip:            "[WvW] Supply camps are the most accessible WvW objectives. A roamer or small group can flip camps quickly on quieter borderlands.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  192: {
    // Capture 5 Towers in WvW
    title:          "Capture 5 Towers in World vs. World",
    track:          "WvW",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    5,
    time_verified:  false,
    tip:            "[WvW] Towers require more players and siege than camps. Join a commander-led zerg during an active offensive push for fastest progress.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  137: {
    // Capture 3 Keeps in WvW
    title:          "Capture 3 Keeps in World vs. World",
    track:          "WvW",
    acclaim:        50,
    time_per_stage: 25,
    stage_count:    3,
    time_verified:  false,
    tip:            "[WvW] Keeps require coordinated siege and a sizeable group. Join a commander in Eternal Battlegrounds or a borderland during a full offensive.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  109: {
    // Capture 10 Ruin, Shrine, or Mercenary Camp Objectives in WvW
    title:          "Capture 10 Ruin, Shrine, or Mercenary Camp Objectives in World vs. World",
    track:          "WvW",
    acclaim:        50,
    time_per_stage: 8,
    stage_count:    10,
    time_verified:  false,
    tip:            "[WvW] Ruins (Desert Borderlands) and shrines (Alpine Borderlands) flip quickly. Mercenary camps require killing a group of NPC mercenaries. All are faster to capture than towers or keeps.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  50: {
    // Defeat 10 WvW Invaders
    title:          "Defeat 10 World vs. World Invaders",
    track:          "WvW",
    acclaim:        50,
    time_per_stage: 8,
    stage_count:    10,
    time_verified:  false,
    tip:            "[WvW] Engage enemy players actively. Defending a contested objective gives reliable kill opportunities as enemies push in.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  144: {
    // Defeat 25 Enemy Guards in WvW
    title:          "Defeat 25 Enemy Guards in World vs. World",
    track:          "WvW",
    acclaim:        50,
    time_per_stage: 3,
    stage_count:    25,
    time_verified:  false,
    tip:            "[WvW] Enemy NPC guards are cleared at every objective you attack. Attacking 4–5 enemy objectives will passively accumulate the full count.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  94: {
    // Destroy 10 Enemy Supply Caravans in WvW
    title:          "Destroy 10 Enemy Supply Caravans in World vs. World",
    track:          "WvW",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    10,
    time_verified:  false,
    tip:            "[WvW] Enemy dolyaks travel fixed routes between objectives. Intercept them along paths through enemy territory. Quieter borderlands have easier-to-reach dolyaks.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  32: {
    // Escort 6 Allied Supply Caravans to Their Destinations in WvW
    title:          "Escort 6 Allied Supply Caravans to Their Destinations in World vs. World",
    track:          "WvW",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    6,
    time_verified:  false,
    tip:            "[WvW] Walk alongside friendly dolyaks as they travel between objectives. Stay nearby and help defend them from interception. This is a passive objective - just keep up with each dolyak.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  206: {
    // Defend 10 WvW Objectives
    title:          "Defend 10 World vs. World Objectives",
    track:          "WvW",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    10,
    time_verified:  false,
    tip:            "[WvW] Defense credits require participating in a defense event when enemies attack a friendly objective. Stay in an active contested area and respond to attack callouts.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  163: {
    // Restore 50,000 Health to Yourself or Allied Players
    title:          "Restore 50,000 Health to Yourself or Allied Players",
    track:          "WvW",
    acclaim:        50,
    time_per_stage: 30,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Play a healing-focused support build and sustain allies during fights. Healing-heavy builds (Tempest, Druid, Firebrand) in an active zerg accumulate healing rapidly. Self-healing during sustained solo combat also counts.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  85: {
    // Deal 500,000 Damage to Enemy Players in sPvP or WvW
    title:          "Deal 500,000 Damage to Enemy Players in Structured Player vs. Player or World vs. World",
    track:          "WvW",
    acclaim:        50,
    time_per_stage: 60,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW/PvP] Damage accumulates across the whole session. In WvW, an active hour in large zerg fights builds damage quickly. In sPvP, high-damage power builds reach this faster per match.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  359: {
    // Deal 500,000 Damage Using Siege Equipment in WvW
    title:          "Deal 500,000 Damage Using Siege Equipment",
    track:          "WvW",
    acclaim:        50,
    time_per_stage: 45,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Operate siege weapons during active objective fights. Trebuchets and Catapults deal high damage to structures; Arrow Carts deal high damage to players during rushes.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  /* ══════════════════════════════════════════════════════════════
     PvP - DAILY (10 acclaim)
     ══════════════════════════════════════════════════════════════ */

  2: {
    // Compete in 1 Player vs. Player Team Battle
    title:          "Compete in 1 Player vs. Player Team Battle",
    track:          "PvP",
    acclaim:        10,
    time_per_stage: 12,
    stage_count:    1,
    time_verified:  false,
    tip:            "[PvP] Queue for any unranked or ranked match from the PvP lobby. One match completion - win or loss - is sufficient.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  18: {
    // Defeat 3 Enemy Players in a Structured PvP Match
    title:          "Defeat 3 Enemy Players in a Structured PvP Match",
    track:          "PvP",
    acclaim:        10,
    time_per_stage: 12,
    stage_count:    3,
    time_verified:  false,
    tip:            "[PvP] Kill 3 enemy players in a single match. Play an offensive build and engage in team fights rather than capping empty points.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  37: {
    // Earn 50 Rank Points in PvP Matches
    title:          "Earn 50 Rank Points in PvP Matches",
    track:          "PvP",
    acclaim:        10,
    time_per_stage: 12,
    stage_count:    1,
    time_verified:  false,
    tip:            "[PvP] Rank points are earned from participating in matches regardless of outcome. A single match typically awards 30–50 rank points - two matches should comfortably cover this.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  78: {
    // Earn a Top Scoreboard Stat on Your Team in a PvP Match
    title:          "Earn a Top Scoreboard Stat on Your Team in a PvP Match",
    track:          "PvP",
    acclaim:        10,
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "[PvP] Finish a match leading your team in any one category - kills, damage, healing, or capture points. Focusing on a single stat and sustaining that focus throughout the match increases your chance of leading it.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  157: {
    // Earn 1 reward from a PvP Reward Track
    title:          "Earn 1 reward from a PvP Reward Track",
    track:          "PvP",
    acclaim:        10,
    time_per_stage: 12,
    stage_count:    1,
    time_verified:  false,
    tip:            "[PvP] PvP Reward Track progress is earned in every match. One full match should trigger at least one reward chest. Make sure an active reward track is selected before queuing.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  174: {
    // Deal 100,000 Damage to Enemy Players in PvP
    title:          "Deal 100,000 Damage to Enemy Players",
    track:          "PvP",
    acclaim:        10,
    time_per_stage: 12,
    stage_count:    1,
    time_verified:  false,
    tip:            "[PvP] Play a power DPS build and focus on combat. One or two matches with a damage-focused build is typically sufficient.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  /* ══════════════════════════════════════════════════════════════
     PvP - WEEKLY (50 acclaim)
     ══════════════════════════════════════════════════════════════ */

  91: {
    // Defeat 30 Players in Structured PvP
    title:          "Defeat 30 Players in Structured Player vs. Player",
    track:          "PvP",
    acclaim:        50,
    time_per_stage: 12,
    stage_count:    5,
    time_verified:  false,
    tip:            "[PvP] Kill 30 enemy players across multiple matches - roughly 10 kills per match with an offensive build. Engage actively in team fights rather than holding points passively.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  108: {
    // Compete in 10 Structured PvP Matches
    title:          "Compete in 10 Structured Player vs. Player Matches",
    track:          "PvP",
    acclaim:        50,
    time_per_stage: 12,
    stage_count:    10,
    time_verified:  false,
    tip:            "[PvP] Complete 10 matches - win or loss both count. Unranked reduces pressure. Allow roughly 2 hours depending on queue times.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  110: {
    // Earn a Top Scoreboard Stat on Your Team in a PvP Match 5 Times
    title:          "Earn a Top Scoreboard Stat on Your Team in a PvP Match 5 Times",
    track:          "PvP",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    5,
    time_verified:  false,
    tip:            "[PvP] Lead your team in any one scoreboard category across 5 separate matches. Specialising in one measurable stat and maintaining focus across multiple matches is most reliable.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  141: {
    // Defeat 3 Enemies While Defending a Capture Point in Rated PvP Conquest
    title:          "Defeat 3 Enemies While Defending a Capture Point in Rated Player vs. Player Conquest Matches",
    track:          "PvP",
    acclaim:        50,
    time_per_stage: 5,
    stage_count:    3,
    time_verified:  false,
    tip:            "[PvP - Ranked only] Stand on a friendly capture point and kill 3 enemies who contest it. A tanky or bruiser build works well for holding points under pressure.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  80: {
    // Neutralize 5 Enemy Capture Points in Rated PvP Conquest
    title:          "Neutralize 5 Enemy Capture Points in Rated Player vs. Player Conquest Matches",
    track:          "PvP",
    acclaim:        50,
    time_per_stage: 10,
    stage_count:    5,
    time_verified:  false,
    tip:            "[PvP - Ranked only] Neutralize (not necessarily fully capture) 5 enemy-held points across one or more matches. Roaming between contested points is more efficient than fully capping each one.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  145: {
    // Win 3 Structured PvP Rated Games
    title:          "Win 3 Structured Player vs. Player Rated Games",
    track:          "PvP",
    acclaim:        50,
    time_per_stage: 20,
    stage_count:    3,
    time_verified:  false,
    tip:            "[PvP - Ranked only] Win 3 ranked matches. Play a meta build in a role you're comfortable with. Allow more time than 3 matches depending on win rate.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  171: {
    // Win 5 Games in Structured PvP
    title:          "Win 5 Games in Structured Player vs. Player",
    track:          "PvP",
    acclaim:        50,
    time_per_stage: 12,
    stage_count:    5,
    time_verified:  false,
    tip:            "[PvP] Win 5 matches - ranked or unranked. Allow 1.5–2.5 hours depending on queue times and win rate.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  36: {
    // Win 1 Game in Conquest Mode after Completing the Map's Secondary Objective
    title:          "Win 1 Game in Conquest Mode after Completing the Map\'s Secondary Objective",
    track:          "PvP",
    acclaim:        50,
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "[PvP] Each Conquest map has a secondary objective (e.g., killing the lord, capturing a shrine or relic). Complete the map's secondary objective during the match AND win. Coordinating the secondary with your team improves success rate.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  167: {
    // Participate in 1 PvP Tournament Match
    // ⚠️ VERIFY: Tournaments are timed - add schedule if known
    title:          "Participate in 1 Player vs. Player Tournament Match",
    track:          "PvP",
    acclaim:        50,
    time_per_stage: 30,
    stage_count:    1,
    time_verified:  false,
    tip:            "[PvP] Automated Tournaments run on a fixed schedule. Sign up via the PvP panel before the start time. Participation (not a win) is sufficient for credit. The schedule shown reflects all possible windows - only those matching your region will be available.",
    waypoint:       null,
    timed:          true,
    schedule:       ["00:00","03:00","09:00","12:00","15:00","18:00","21:00"],
    priority:       PRIORITY.HIGH,
  },

  177: {
    // Earn 5 Rewards from Structured PvP Reward Tracks
    title:          "Earn 5 Rewards from Structured Player vs. Player Reward Tracks",
    track:          "PvP",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    5,
    time_verified:  false,
    tip:            "[PvP] Play 5+ matches with an active reward track. Each match progresses the track and triggers reward pips at regular intervals. Combine naturally with other PvP objectives.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  184: {
    // Earn 1,000 PvP Rank Points
    title:          "Earn 1,000 PvP Rank Points",
    track:          "PvP",
    acclaim:        50,
    time_per_stage: 15,
    stage_count:    7,
    time_verified:  false,
    tip:            "[PvP] Rank points accumulate across all PvP matches regardless of outcome - roughly 30–200 points per match depending on performance. Expect 6–10 matches to complete this.",
    waypoint:       null,
    timed:          false,
    priority:       PRIORITY.NORMAL,
  },

  /* ══════════════════════════════════════════════════════════════
     ADD NEW OBJECTIVES BELOW
     ──────────────────────────────────────────────────────────────
     Template:

     999: {
       time_per_stage: 10,
       stage_count:    1,
       time_verified:  false,
       tip:            "How to complete this efficiently.",
       waypoint:       "[&XXXXXXX=]",   // or null
       timed:          false,
       // schedule:    ["HH:MM", ...],  // only when timed: true
       priority:       PRIORITY.NORMAL,
     },
     ════════════════════════════════════════════════════════════ */
};
