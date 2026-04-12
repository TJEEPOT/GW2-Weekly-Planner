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
 * priority        {boolean}  true = schedule before non-priority items.
 *
 * ── VERIFICATION NOTES ───────────────────────────────────────────
 * Entries marked ⚠️ VERIFY need in-game confirmation.
 * See the VERIFICATION CHECKLIST at the bottom of this file.
 * ─────────────────────────────────────────────────────────────────
 */

export const META = {

  /* ══════════════════════════════════════════════════════════════
     PvE - DAILY (10 acclaim)
     ══════════════════════════════════════════════════════════════ */

  133: {
    // Log In
    time_per_stage: 1,
    stage_count:    1,
    time_verified:  true,
    tip:            "Simply logging in completes this automatically.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  125: {
    // Dodge 3 Enemy Attacks Using a Dodge Roll
    time_per_stage: 0.33,
    stage_count:    3,
    time_verified:  true,
    tip:            "You only need to press the dodge key while in combat - you don't have to actually evade an attack. Quickest method: take a small fall from your skyscale to enter combat, then dodge 3 times. Or go to the PvP lobby and dodge next to the running target golems at the Combat Training WP.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  20: {
    // Perform 3 Combo Skills in Combat
    time_per_stage: 0.33,
    stage_count:    3,
    time_verified:  true,
    tip:            "Most rotations trigger combos naturally during regular combat. If you want to target this objective, go to the PvP lobby (Combat Training WP) and use combo finishers inside a combo field on the golems. Alternatively, attack Trainer Raji at the Seitung Province Training Grounds (Monastery WP).",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  182: {
    // Break 1 Enemy's Defiance Bar
    time_per_stage: 1,
    stage_count:    1,
    time_verified:  true,
    tip:            "Any orange defiance bar counts. Easiest options: (1) PvP lobby - attack the Elite Target Golem and use crowd-control skills; Siege Turtle or Warclaw break bars fast. (2) LA Aerodrome Special Forces Training Area - configure a golem with a defiance bar. (3) Seitung Province Training Grounds (Monastery WP) - the Training Mech hero point south-east of the WP has a defiance bar.",
    waypoint:       "[&BL8MAAA=]",
    timed:          false,
    priority:       false,
  },

  149: {
    // Defeat 25 Enemies
    time_per_stage: 0.1,
    stage_count:    25,
    time_verified:  true,
    tip:            "Completes naturally alongside almost any other PvE objective. For a dedicated run: Pocket Raptors south of Westwatch WP (Verdant Brink) spawn in large packs, or Fireflies and Scaled Drakes south-west of Wardenhurst WP (The Verdence) are low-level and fast to clear.",
    waypoint:       "[&BL4NAAA=]",
    timed:          false,
    priority:       false,
  },

  140: {
    // Defeat 5 Veteran Enemies
    time_per_stage: 0.4,
    stage_count:    5,
    time_verified:  true,
    tip:            "Completes naturally during other objectives. If you want to focus on it, travel to Fort Marriner and enter the Fractal portal, choosing level 4 Urban Battleground. Enter the fractal and turn right just outside the starting tent - waves of low-health veteran enemies constantly spawn here.",
    waypoint:       "[&BDAEAAA=]",
    timed:          false,
    priority:       false,
  },

  34: {
    // Defeat 10 Enemies While Under a Nourishment Effect
    time_per_stage: 0.1,
    stage_count:    10,
    time_verified:  true,
    tip:            "Eat any food before starting (the Malnourished debuff also counts). Easiest food buff is the cake fired from a Birthday Blaster or Feast of Delectable Birthday Cake, though if you don't have those, the cheapest option is usually a Soul Pastry.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  195: {
    // Defeat 10 Enemies While Under an Enhancement Effect
    time_per_stage: 0.1,
    stage_count:    10,
    time_verified:  true,
    tip:            "Use any utility consumable before starting (the Diminished debuff also counts). The easiest option is to use a Candy Corn / Zhaitaffy / Snowflake gobbler, though if you don't have these, the cheapest option is usually an Apprentice Tuning Crystal.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  104: {
    // Defeat 10 Enemies in the Heart of Maguuma
    time_per_stage: 0.2,
    stage_count:    10,
    time_verified:  true,
    tip:            "Pocket Raptors in Dry Step Mesas (Shipwreck Peak WP, Maguuma's Breach) spawn in large groups and die quickly.",
    waypoint:       "[&BN4HAAA=]",
    timed:          false,
    priority:       false,
  },

  132: {
    // Defeat 10 Enemies in the Horn of Maguuma
    time_per_stage: 0.3,
    stage_count:    10,
    time_verified:  true,
    tip:            "Non-hostile Dust Mites spawn around the Wizard's Tower area (Tower Courtyard WP, Outer Ring) and can be killed easily.",
    waypoint:       "[&BB8OAAA=]",
    timed:          false,
    priority:       false,
  },

  83: {
    // Defeat 10 Enemies in Cantha
    time_per_stage: 0.3,
    stage_count:    10,
    time_verified:  true,
    tip:            "Non-aggressive animals east of the Spirit Vestibule POI in Seitung Province (Village WP, Seitung Harbor) are plentiful and easy to kill, though any End of Dragons map works.",
    waypoint:       "[&BJ4MAAA=]",
    timed:          false,
    priority:       false,
  },

  58: {
    // Defeat 10 Enemies in the Crystal Desert
    time_per_stage: 0.3,
    stage_count:    10,
    time_verified:  true,
    tip:            "Forged Prowlers spawn in packs in Vehjin Mines (Vehjin Palace WP, Desert Highlands) during events. Enemies north of Destiny's Gorge WP in the blockaded cliff pass are also reliable.",
    waypoint:       "[&BO0KAAA=]",
    timed:          false,
    priority:       false,
  },

  276: {
    // Defeat 10 Enemies in the Janthir Region
    time_per_stage: 0.4,
    stage_count:    10,
    time_verified:  true,
    tip:            "Any enemies in Lowland Shore or Janthir Syntri count. Enemies are plentiful throughout both maps.",
    waypoint:       "[&BCcPAAA=]",
    timed:          false,
    priority:       false,
  },

  335: {
    // Defeat 10 Enemies in the Castora Region
    time_per_stage: 1.3,
    stage_count:    10,
    time_verified:  true,
    tip:            "Hermit Crabs on the beach east of Lilycreek Cascade POI (Breezy Cay) are plentiful and easy.",
    waypoint:       "[&BIkPAAA=]",
    timed:          false,
    priority:       false,
  },

  1: {
    // Complete 3 Events
    time_per_stage: 2.5,
    stage_count:    3,
    time_verified:  false,
    tip:            "Completes naturally during most other PvE objectives. For a dedicated run: RIBA in the Silverwastes chains many events quickly. Rift hunting gives two event credits per rift. Opening the chest at the end of a jumping puzzle also awards 1 event credit.",
    waypoint:       "[&BH8HAAA=]",
    timed:          false,
    priority:       false,
  },

  62: {
    // Complete a Renown Heart
    time_per_stage: 4,
    stage_count:    1,
    time_verified:  true,
    tip:            "Depends on which expansions you have access to. JW or VoE: buy Local Writs of Renown from a renown vendor to instantly complete their heart. EoD: 'Help Xunlai Jade test and promote jade tech' at [&BBYNAAA=] can be completed by repeatedly getting on and off a Zip Line. PoF: 'Give aid to the refugees at Marifa Camp' at [&BAQKAAA=] is easily completed. LWS4: 'Atholma Farms' at [&BDYLAAA=], stomp the beetle mounds with your springer mount without engaging the beetles.",
    waypoint:       "[&BMwPAAA=]",
    timed:          false,
    priority:       false,
  },

  117: {
    // Participate in 1 Rift Hunt Event
    time_per_stage: 3,
    stage_count:    1,
    time_verified:  true,
    tip:            "Tier 1 Rift events in Skywatch Archipelago are targeted by many people, you're unlikely to be alone.",
    waypoint:       "[&BL4NAAA=]",
    timed:          false,
    priority:       false,
  },

  164: {
    // Catch 5 Fish
    time_per_stage: 1,
    stage_count:    5,
    time_verified:  true,
    tip:            "Any open-water fishing spot works. Fishing Village (Village WP, Seitung Province) has open water right nearby. Your JW homestead fishing hole also counts.",
    waypoint:       "[&BJ4MAAA=]",
    timed:          false,
    priority:       false,
  },

  88: {
    // Identify 10 Pieces of Unidentified Gear
    time_per_stage: 2,
    stage_count:    1,
    time_verified:  true,
    tip:            "Buy 10 Pieces of Common Unidentified Gear from the Trading Post and identify them. Do this in the open world as certain instances (Strikes, etc.) can prevent progress from counting.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  65: {
    // Salvage 10 Items
    time_per_stage: 2,
    stage_count:    1,
    time_verified:  false,
    tip:            "Buy 10 cheap dyes or Pieces of Common Unidentified Gear from the Trading Post and salvage with a Crude Salvage Kit. Do this in the open world as certain instances (Strikes, etc.) can prevent progress from counting.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  43: {
    // Craft 10 Items
    time_per_stage: 3,
    stage_count:    1,
    time_verified:  true,
    tip:            "Either combine Essences of Luck as an Artificer, or refine 10 basic materials such as Mithril Ore into Mithril Ingots at any crafting station.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  95: {
    // Harvest 10 Resources with a Harvesting Sickle
    time_per_stage: 1,
    stage_count:    10,
    time_verified:  false,
    tip:            "Your guild hall, home instance, or homestead resource nodes are the most convenient. A lettuce farm south of Beetletun WP (Shire of Beetletun, Queensdale) has 8 nodes with more nearby.",
    waypoint:       "[&BPoAAAA=]",
    timed:          false,
    priority:       false,
  },

  79: {
    // Gather 15 Resources with a Logging Axe
    time_per_stage: 0.2,
    stage_count:    15,
    time_verified:  false,
    tip:            "Guild hall, home instance, or homestead trees are fastest. Open world: 5 Cypress Saplings near Rayhan Bayt ([&BJ4CAAA=]) or 5 Baoba Saplings south of Gauntlet WP ([&BNMCAAA=]) give 3 resources per tree.",
    waypoint:       "[&BJ4CAAA=]",
    timed:          false,
    priority:       false,
  },

  128: {
    // Gather 15 Resources with a Mining Pick
    time_per_stage: 0.2,
    stage_count:    15,
    time_verified:  false,
    tip:            "Guild hall, home instance, or homestead ore nodes are fastest. Open world: Platinum Ore and Rich Platinum Veins around Rata Pten ([&BMQCAAA=]) give 3 resources per node.",
    waypoint:       "[&BMkCAAA=]",
    timed:          false,
    priority:       false,
  },

  115: {
    // Gather 25 Crafting Resources
    time_per_stage: 0.2,
    stage_count:    25,
    time_verified:  true,
    tip:            "A single circuit of your homestead or home instance nodes will often complete this. Remaining nodes can be found in north-east Mount Maelstrom. From Criterion WP, head north-west up the road, then south when the road ends, there are plenty of tree and ore nodes going down through Criterion Canyon.",
    waypoint:       "[&BMkCAAA=]",
    timed:          false,
    priority:       false,
  },

  350: {
    // Complete a Fractal in the Fractals of the Mists
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Any Tier 1 fractal works. Quickplay usually finds a group faster than LFG. The Fractals portal is in Lion's Arch near Fort Marriner.",
    waypoint:       "[&BDAEAAA=]",
    timed:          false,
    priority:       true,
  },

  /* ══════════════════════════════════════════════════════════════
     PvE - WEEKLY (50 acclaim) - Events & Bounties
     ══════════════════════════════════════════════════════════════ */

  57: {
    // Complete 10 Events
    time_per_stage: 2,
    stage_count:    10,
    time_verified:  true,
    tip:            "Completes naturally during most other PvE objectives. For a dedicated run: RIBA in the Silverwastes chains many events quickly. Rift hunting gives two event credits per rift. Opening the chest at the end of a jumping puzzle also awards 1 event credit.",
    waypoint:       "[&BH8HAAA=]",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  3: {
    // Complete 5 Bounty Missions in Crystal Oasis or Group Events
    time_per_stage: 2,
    stage_count:    5,
    time_verified:  true,
    tip:            "Any open-world group event (with other players present) counts. RIBA fortresses in the Silverwastes are fast, easy, and soloable group events. Alternatively, use the Bounty Board at the Amnoon WP ([&BLsKAAA=]). Avoid the Temple of Kormir board as those bounties may not count.",
    waypoint:       "[&BH8HAAA=]",
    timed:          false,
    priority:       false,
  },

  7: {
    // Complete 5 Bounty Missions in Desert Highlands or Group Events
    time_per_stage: 2,
    stage_count:    5,
    time_verified:  true,
    tip:            "Any open-world group event (with other players present) counts. RIBA fortresses in the Silverwastes are fast, easy, and soloable group events. Alternatively, use the Bounty Board at the Makali Outpost WP ([&BGsKAAA=]).",
    waypoint:       "[&BH8HAAA=]",
    timed:          false,
    priority:       false,
  },

  87: {
    // Complete 5 Bounty Missions in Elon Riverlands or Group Events
    time_per_stage: 2,
    stage_count:    5,
    time_verified:  true,
    tip:            "Any open-world group event (with other players present) counts. RIBA fortresses in the Silverwastes are fast, easy, and soloable group events. Alternatively, use the Bounty Board at the Augury's Shadow WP ([&BFMKAAA=]).",
    waypoint:       "[&BH8HAAA=]",
    timed:          false,
    priority:       false,
  },

  121: {
    // Complete 5 Bounty Missions in the Desolation or Group Events
    time_per_stage: 2,
    stage_count:    5,
    time_verified:  true,
    tip:            "Any open-world group event (with other players present) counts. RIBA fortresses in the Silverwastes are fast, easy, and soloable group events. Alternatively, use the Bounty Board at the Bonestrand WP ([&BNwKAAA=]).",
    waypoint:       "[&BH8HAAA=]",
    timed:          false,
    priority:       false,
  },

  169: {
    // Complete 5 Bounty Missions in the Domain of Vabbi or Group Events
    time_per_stage: 2,
    stage_count:    5,
    time_verified:  true,
    tip:            "Any open-world group event (with other players present) counts. RIBA fortresses in the Silverwastes are fast, easy, and soloable group events. Alternatively, use the Bounty Board at the Vehjin Palace WP ([&BO0KAAA=]).",
    waypoint:       "[&BH8HAAA=]",
    timed:          false,
    priority:       false,
  },

  120: {
    // Complete 7 Rift Hunts in Horn of Maguuma or Group Events
    time_per_stage: 3,
    stage_count:    7,
    time_verified:  true,
    tip:            "Complete Tier 1 Rifts in Skywatch Archipelago or check the Weekly Rift Hunting panel for active rift locations. Group events anywhere count as an alternative, so this will probably be mostly complete before getting to it.",
    waypoint:       "[&BL4NAAA=]",
    timed:          false,
    priority:       false,
  },

  347: {
    // Complete 7 Rift Hunts in Castora or Group Events
    time_per_stage: 3,
    stage_count:    7,
    time_verified:  true,
    tip:            "Complete Tier 1 Rifts in Shipwreck Strand, you can pair this with the Linus VoE Chest Farm, which takes about 45 minutes in total. Group events anywhere count as an alternative, so this will probably be mostly complete before getting to it.",
    waypoint:       "[&BJwPAAA=]",
    timed:          false,
    priority:       false,
  },

  352: {
    // Complete 7 Rift Hunts in Janthir or Group Events
    time_per_stage: 3,
    stage_count:    7,
    time_verified:  true,
    tip:            "Complete Rifts in Janthir region maps (Lowland Shore, Janthir Syntri) - requires Janthir Wilds expansion. Check the Weekly Rift Hunting panel. Group events anywhere count as an alternative.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  123: {
    // Gather 100 Crafting Resources by Mining, Logging, Fishing, or Harvesting
    time_per_stage: 1,
    stage_count:    100,
    time_verified:  false,
    tip:            "Any combination of gathering counts - each node interaction gives 3 resources, so you need roughly 34 nodes. A full circuit of a well-stocked guild hall or home instance can complete this in a single run.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  /* ══════════════════════════════════════════════════════════════
     PvE - WEEKLY (50 acclaim) - Enemy Faction Kills
     ══════════════════════════════════════════════════════════════ */

  5: {
    // Defeat 50 Veteran-Rank Enemies
    time_per_stage: 2,
    stage_count:    10,
    time_verified:  false,
    tip:            "Completes naturally during other objectives, but if you want to focus on it, travel to Fort Marriner and enter the Fractal portal, choosing level 4 Urban Battleground. Enter the fractal and turn right just outside the starting tent - waves of low-health veteran enemies constantly spawn here.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  135: {
    // Defeat 10 Champion-Rank Enemies
    time_per_stage: 5,
    stage_count:    10,
    time_verified:  false,
    tip:            "Shadow Behemoth world boss spawns 15–20 Champion Fleshreavers and Shades during its portal phases - easy to tag. Alternatively: Mistlock Observatory - speak to the Fractal Instability Trainer, set rank to Champion, spawn up to 4 idle Champion Mark I Golems. Urban Battleground Fractal (scale 2) has several champions in the cell room.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  59: {
    // Defeat 1 Legendary-Rank Enemy
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Most world bosses trigger this despite their displayed rank - exceptions are Modniir Ulgoth, Inquest Golem Mk II, and Tequatl. PoF Bounties marked Legendary on the board count. Strike Mission: Shiverpeaks Pass (Eye of the North WP) - the Legendary Icebrood Construct final boss counts and requires Path of Fire.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  150: {
    // Defeat Awakened or Risen
    // ⚠️ VERIFY: stage_count is estimated - check your API progress_complete
    time_per_stage: 1,
    stage_count:    50,
    time_verified:  false,
    tip:            "⚠️ VERIFY stage count. Bonestrand Garrison (Bonestrand WP, The Bonestrand) has dense Awakened including veterans; interact with Vizier's Propaganda posters to spawn more. Risen fill Orr maps (Straits of Devastation, Malchor's Leap, Cursed Shore).",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  70: {
    // Defeat Mordrem or Nightmare Court
    // ⚠️ VERIFY: stage_count is estimated - check your API progress_complete
    time_per_stage: 1,
    stage_count:    50,
    time_verified:  false,
    tip:            "⚠️ VERIFY stage count. Mordrem are found throughout HoT maps (Verdant Brink, Auric Basin, Tangled Depths, Dragon's Stand). Nightmare Court appear in Caledon Forest and the Twilight Arbor dungeon.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  77: {
    // Defeat Void Enemies or Sons of Svanir
    // ⚠️ VERIFY: stage_count is estimated - check your API progress_complete
    time_per_stage: 1,
    stage_count:    50,
    time_verified:  false,
    tip:            "⚠️ VERIFY stage count. Void enemies are found in Skywatch Archipelago and Amnytas (SotO maps, requires SotO). Sons of Svanir appear in Wayfarer Foothills and Frostgorge Sound.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  143: {
    // Defeat Jade Mechs or Inquest
    // ⚠️ VERIFY: stage_count is estimated - check your API progress_complete
    time_per_stage: 1,
    stage_count:    50,
    time_verified:  false,
    tip:            "⚠️ VERIFY stage count. Jade Mechs are found throughout EoD maps. Inquest appear in Metrica Province and the Urban Battleground Fractal - the fractal has dense Inquest spawns in the opening area.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  190: {
    // Defeat Kryptis or Bandits
    // ⚠️ VERIFY: stage_count is estimated - check your API progress_complete
    time_per_stage: 1,
    stage_count:    50,
    time_verified:  false,
    tip:            "⚠️ VERIFY stage count. Kryptis are the primary enemies in SotO maps (Skywatch Archipelago, Amnytas, Inner Nayos), requires SotO. Bandits appear in Kessex Hills and Queensdale.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  193: {
    // Defeat Forged or Flame Legion
    // ⚠️ VERIFY: stage_count is estimated - check your API progress_complete
    time_per_stage: 1,
    stage_count:    50,
    time_verified:  false,
    tip:            "⚠️ VERIFY stage count. Forged are dense in Crystal Desert PoF maps - especially Vehjin Mines (Crystal Oasis) and Domain of Vabbi. Flame Legion Charr appear in Blazeridge Steppes, Diessa Plateau, and Fields of Ruin.",
    waypoint:       "[&BNQEAAA=]",
    timed:          false,
    priority:       false,
  },

  272: {
    // Defeat Titanspawn or Elemental Enemies
    // ⚠️ VERIFY: stage_count is estimated - check your API progress_complete
    time_per_stage: 1,
    stage_count:    50,
    time_verified:  false,
    tip:            "⚠️ VERIFY stage count. Titanspawn are found in Janthir Wilds maps (requires Janthir Wilds expansion). Elemental enemies (Earth, Fire, Water, Air Elementals) appear throughout core Tyria and HoT maps.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  334: {
    // Defeat Inquest Enemies or Pirates
    // ⚠️ VERIFY: stage_count is estimated - check your API progress_complete
    time_per_stage: 1,
    stage_count:    50,
    time_verified:  false,
    tip:            "⚠️ VERIFY stage count. Inquest appear in Metrica Province and Urban Battleground Fractal. Pirates (Consortium/bandit crews) are found in Southsun Cove and Kessex Hills.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  /* ══════════════════════════════════════════════════════════════
     PvE - WEEKLY (50 acclaim) - World Boss Events
     ──────────────────────────────────────────────────────────────
     ⚠️ World bosses other than Tequatl are marked timed:false
     pending schedule verification. To enable smart scheduling:
       1. Look up UTC times at https://gw2timer.com
       2. Set  timed: true
       3. Add  schedule: ["HH:MM", ...]
     ══════════════════════════════════════════════════════════════ */

  358: {
    // Defeat Tequatl the Sunless or Complete Events in Sparkfly Fen
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "Prioritise the Tequatl fight - it's the fastest completion and well-organised on most servers. Arrive 5 minutes early at the Splintered Coast. If you miss the window, completing events in Sparkfly Fen works but takes much longer.",
    waypoint:       "[&BNABAAA=]",
    timed:          true,
    schedule:       ["00:00", "03:00", "07:00", "11:30", "16:00", "19:00"],
    priority:       true,
  },

  60: {
    // Defeat the Shadow Behemoth World Boss or Complete Events in Queensdale
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:8, every 2h at 1:45)
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "Shadow Behemoth spawns every 2 hours in Godslost Swamp, Queensdale - the next UTC time is shown on your schedule. Arrive a few minutes early. Note: this fight also spawns Champion Fleshreavers during its portal phases, useful for the Defeat 10 Champions objective. Queensdale events count as an alternative.",
    waypoint:       null,
    timed:          true,
    schedule:       ["01:45","03:45","05:45","07:45","09:45","11:45","13:45","15:45","17:45","19:45","21:45","23:45"],
    priority:       true,
  },

  178: {
    // Defeat the Svanir Shaman Chief World Boss or Complete Events in Wayfarer Foothills
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:2, every 2h at :15)
    time_per_stage: 12,
    stage_count:    1,
    time_verified:  false,
    tip:            "Svanir Shaman Chief spawns every 2 hours throughout the day - the next UTC time is shown on your schedule. Arrive a few minutes early at Wayfarer Foothills. If you miss the window, events in Wayfarer Foothills near the starting area count as an alternative.",
    waypoint:       null,
    timed:          true,
    schedule:       ["00:15","02:15","04:15","06:15","08:15","10:15","12:15","14:15","16:15","18:15","20:15","22:15"],
    priority:       true,
  },

  55: {
    // Defeat the Fire Elemental World Boss or Complete Events in Metrica Province
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:4, every 2h at :45)
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "Fire Elemental spawns every 2 hours near the Thaumanova Reactor in Metrica Province - the next UTC time is shown on your schedule. Arrive a few minutes early. Metrica Province events around the reactor area count as an alternative.",
    waypoint:       null,
    timed:          true,
    schedule:       ["00:45","02:45","04:45","06:45","08:45","10:45","12:45","14:45","16:45","18:45","20:45","22:45"],
    priority:       true,
  },

  134: {
    // Defeat the Megadestroyer World Boss or Complete Events in Mount Maelstrom
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:3, every 3h at :30)
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Megadestroyer spawns every 3 hours in Mount Maelstrom - the next UTC time is shown on your schedule. Arrive a few minutes early. Mount Maelstrom events around the volcanic region count as an alternative.",
    waypoint:       null,
    timed:          true,
    schedule:       ["00:30","03:30","06:30","09:30","12:30","15:30","18:30","21:30"],
    priority:       true,
  },

  159: {
    // Defeat the Inquest Golem Mark II World Boss or Complete Events in Mount Maelstrom
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:10, every 3h at :00 offset 2h)
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Inquest Golem Mk II spawns every 3 hours in Mount Maelstrom - the next UTC time is shown on your schedule. Note: this boss does NOT count for the Defeat 1 Legendary-Rank Enemy objective. Mount Maelstrom events count as an alternative.",
    waypoint:       null,
    timed:          true,
    schedule:       ["02:00","05:00","08:00","11:00","14:00","17:00","20:00","23:00"],
    priority:       true,
  },

  196: {
    // Defeat the Shatterer World Boss or Complete Events in Blazeridge Steppes
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:5, every 3h at 1:00)
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "The Shatterer spawns every 3 hours in the Lowland Burns area of Blazeridge Steppes - the next UTC time is shown on your schedule. Arrive a few minutes early. Blazeridge Steppes events count as an alternative.",
    waypoint:       null,
    timed:          true,
    schedule:       ["01:00","04:00","07:00","10:00","13:00","16:00","19:00","22:00"],
    priority:       true,
  },

  19: {
    // Defeat the Claw of Jormag World Boss or Complete Events in Frostgorge Sound
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:9, every 3h at 2:30)
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Claw of Jormag spawns every 3 hours in Frostgorge Sound - the next UTC time is shown on your schedule. Arrive a few minutes early. Frostgorge Sound events around the Arundon area count as an alternative.",
    waypoint:       null,
    timed:          true,
    schedule:       ["02:30","05:30","08:30","11:30","14:30","17:30","20:30","23:30"],
    priority:       true,
  },

  31: {
    // Defeat the Great Jungle Wurm World Boss or Complete Events in Caledon Forest
    // Schedule derived from the GW2 wiki event timer JSON (core-wb sequence, r:6, every 2h at 1:15)
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Great Jungle Wurm spawns every 2 hours in the Twilight Arbor area of Caledon Forest - the next UTC time is shown on your schedule. Arrive a few minutes early. Caledon Forest events near Ventry Bay count as an alternative.",
    waypoint:       null,
    timed:          true,
    schedule:       ["01:15","03:15","05:15","07:15","09:15","11:15","13:15","15:15","17:15","19:15","21:15","23:15"],
    priority:       true,
  },

  /* ══════════════════════════════════════════════════════════════
     PvE - WEEKLY (50 acclaim) - Meta-Event or Zone Events
     ══════════════════════════════════════════════════════════════ */

  348: {
    // Complete a Meta-Event or Events in the Crystal Desert or Events in Kryta
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Crystal Desert meta-events (Branded, Awakened Invasions, PoF world bosses) are fastest. Alternatively, RIBA in the Silverwastes (Kryta) chains many events quickly, or run a chain of events in Queensdale.",
    waypoint:       "[&BNQEAAA=]",
    timed:          false,
    priority:       false,
  },

  344: {
    // Complete a Meta-Event or Events in Cantha or Events in Maguuma Jungle
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "EoD meta-events (Aetherblade Assault, Kaineng Blackout, Gang War of Echovald, Battle for the Jade Sea) satisfy the Cantha condition. Alternatively, events in Maguuma Jungle (Caledon Forest, Brisban Wildlands, Metrica Province, Dry Top, Silverwastes) count.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  345: {
    // Complete a Meta-Event or Events in Horn of Maguuma or Events in Shiverpeak Mountains
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "SotO meta-events satisfy Horn of Maguuma. Dragonstorm (Shiverpeak Mountains, requires Path of Fire) is fast. Standard Shiverpeak events in Wayfarer Foothills, Lornar's Pass, or Frostgorge Sound also count.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  364: {
    // Complete a Meta-Event or Events in Castora or Events in Orr
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Castora meta-events count, or head to Orr (Straits of Devastation, Malchor's Leap, Cursed Shore) for dense Risen and frequent chain events around the temple areas.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  365: {
    // Complete a Meta-Event or Events in Janthir or Events in Orr
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Janthir Wilds meta-events satisfy the Janthir condition (requires Janthir Wilds expansion). Orr zone events are accessible to all players without expansion.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  367: {
    // Complete a Meta-Event or Events in Heart of Maguuma or Events in Ascalon
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "HoT meta-events (Verdant Brink Night, Auric Basin, Tangled Depths, Dragon's Stand) are efficient for Heart of Maguuma. Ascalon maps (Plains of Ashford, Diessa Plateau, Iron Marches, Blazeridge Steppes, Fields of Ruin) are an easy alternative.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  /* ══════════════════════════════════════════════════════════════
     PvE - WEEKLY (50 acclaim) - Jumping Puzzles
     ══════════════════════════════════════════════════════════════ */

  56: {
    // Complete the Dark Reverie Jumping Puzzle
    // ⚠️ VERIFY waypoint: Spiral WP, Morgan's Spiral, Caledon Forest
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Dark Reverie is in Caledon Forest near Morgan's Spiral (Spiral WP). Moderate difficulty - allow extra time if unfamiliar. Skyscale helps with some sections. Check the GW2 wiki for a step-by-step guide.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  38: {
    // Complete the Shattered Ice Ruins Jumping Puzzle
    // ⚠️ VERIFY waypoint: Ice Floe WP, Shattered Ice Floe
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "Shattered Ice Ruins is in Shattered Ice Floe (Ice Floe WP). You can skip most of the puzzle by scaling the large southern ice wall with a Skyscale, Springer, or upgraded Jade Bot Glide Booster.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  74: {
    // Complete the Branded Mine Jumping Puzzle
    // ⚠️ VERIFY waypoint: Helliot Mine WP, Dragonrot Domains
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Branded Mine is in Dragonrot Domains (Helliot Mine WP). A Crystal Desert mine puzzle of moderate difficulty. Check the wiki for the route.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  129: {
    // Complete the Grendich Gamble Jumping Puzzle
    // ⚠️ VERIFY waypoint: Blasted Moors WP, The Blasted Moors
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "Grendich Gamble is in The Blasted Moors (Blasted Moors WP), Diessa Plateau. A relatively straightforward Charr-ruins puzzle.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  130: {
    // Complete the Spekk's Laboratory Jumping Puzzle
    // ⚠️ VERIFY waypoint: Gleaner's Cove WP, Ogham Wilds
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Spekk's Laboratory is in Ogham Wilds (Gleaner's Cove WP), Caledon Forest. An Asura-themed puzzle of moderate difficulty.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  186: {
    // Complete the Professor Portmatt's Lab Jumping Puzzle
    // ⚠️ VERIFY waypoint: Sorrowful WP, Sorrowful Sound
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "Professor Portmatt's Lab is in Sorrowful Sound (Sorrowful WP), Gendarran Fields. The chest at the end can be reached quickly with a Skyscale + Bond of Faith, and also awards 1 event credit.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  189: {
    // Complete the Fawcett's Bounty Jumping Puzzle
    // ⚠️ VERIFY waypoint: Arcallion WP, Arcallion Digs
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Fawcett's Bounty is in Arcallion Digs (Arcallion WP), Dredgehaunt Cliffs. A standard Shiverpeaks puzzle. Check the wiki for the route.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  180: {
    // Complete the Antre of Adjournment Jumping Puzzle
    // ⚠️ VERIFY waypoint: Valley of Lyss WP
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Antre of Adjournment is in the Valley of Lyss area (Valley of Lyss WP), Straits of Devastation. A moderate difficulty puzzle. Check the wiki for the route.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  101: {
    // Complete the Retrospective Runaround Jumping Puzzle
    // ⚠️ VERIFY waypoint: Drydock Grotto WP, Northeastern Silverwastes
    time_per_stage: 25,
    stage_count:    1,
    time_verified:  false,
    tip:            "Retrospective Runaround is in the Northeastern Silverwastes (Drydock Grotto WP). Collect all 9 stacks of the Milestone buff - no final chest needed. Check the wiki for milestone locations.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  156: {
    // Complete the Weyandt's Revenge Jumping Puzzle
    // ⚠️ VERIFY waypoint: Farshore WP, Farshore Ward, Lion's Arch
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Weyandt's Revenge is in Farshore Ward, Lion's Arch (Farshore WP). A pirate-themed puzzle of moderate difficulty. Note: completing this puzzle does NOT award a free event credit.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  161: {
    // Complete the Skipping Stones Jumping Puzzle
    // ⚠️ VERIFY waypoint: Lion Point WP, Southsun Shoals
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Skipping Stones is in Southsun Cove (Lion Point WP). Head west on a Skimmer, then use Skyscale or Springer + Bond of Faith to reach the island's north side. Run clockwise around the island and over a bridge to the chest.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  4: {
    // Complete the Chaos Crystal Cavern Jumping Puzzle
    // ⚠️ VERIFY waypoint: Old Piken Ruins WP, Champion's Shield
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "Chaos Crystal Cavern is in Champion's Shield (Old Piken Ruins WP), Iron Marches. A crystal-formation puzzle of moderate difficulty. Check the wiki for the route.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  148: {
    // Complete the Pig Iron Quarry Jumping Puzzle
    // ⚠️ VERIFY: location and waypoint - check wiki
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "⚠️ VERIFY location and waypoint. Pig Iron Quarry is reachable with Skyscale + Bond of Faith for a quick event credit alongside the puzzle completion. Check the wiki for the exact location and nearest waypoint.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  146: {
    // Complete the Crimson Plateau Jumping Puzzle
    // ⚠️ VERIFY: location and waypoint - check wiki
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "⚠️ VERIFY location and waypoint. Crimson Plateau is reachable with Skyscale + Bond of Faith. Check the wiki for the exact location and nearest waypoint.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  40: {
    // Complete the Collapsed Observatory Jumping Puzzle
    // ⚠️ VERIFY: location and waypoint not confirmed
    time_per_stage: 25,
    stage_count:    1,
    time_verified:  false,
    tip:            "⚠️ VERIFY location and waypoint. Check the GW2 wiki for 'Collapsed Observatory jumping puzzle' for the waypoint and full route guide.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  44: {
    // Complete the Loreclaw Expanse Jumping Puzzle
    // ⚠️ VERIFY: location and waypoint not confirmed
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "⚠️ VERIFY location and waypoint. Check the GW2 wiki for 'Loreclaw Expanse jumping puzzle' for the exact waypoint and route.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  61: {
    // Complete the Not So Secret Jumping Puzzle
    // ⚠️ VERIFY waypoint in Gendarran Fields
    time_per_stage: 30,
    stage_count:    1,
    time_verified:  false,
    tip:            "Not So Secret is in Gendarran Fields. One of the longer puzzles - allow extra time. A Skyscale significantly helps with several sections. Check the wiki for the waypoint and full route guide.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  105: {
    // Complete the Coddler's Cove Jumping Puzzle
    // ⚠️ VERIFY: location and waypoint not confirmed
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "⚠️ VERIFY location and waypoint. Check the GW2 wiki for 'Coddler's Cove jumping puzzle' for the exact waypoint and route.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  116: {
    // Complete the Tribulation Caverns Jumping Puzzle
    // ⚠️ VERIFY: if this is Tribulation Mode it is extremely difficult
    time_per_stage: 45,
    stage_count:    1,
    time_verified:  false,
    tip:            "⚠️ VERIFY difficulty. If this is a Tribulation Mode puzzle it is extremely challenging - allow significantly more time and follow a guide. If it's a standard puzzle, allow 20–30 minutes. Check the wiki to confirm which version this refers to.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  170: {
    // Complete the Behem Gauntlet Jumping Puzzle
    // ⚠️ VERIFY: likely in Harathi Hinterlands
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "⚠️ VERIFY location and waypoint. Behem Gauntlet is likely in Harathi Hinterlands. Check the GW2 wiki for the exact waypoint and route.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  /* ══════════════════════════════════════════════════════════════
     PvE - WEEKLY - Fractals, Raids, Strikes
     ══════════════════════════════════════════════════════════════ */

  45: {
    // Complete Any Raid Encounter
    time_per_stage: 45,
    stage_count:    1,
    time_verified:  false,
    tip:            "Any raid encounter on any wing counts - you don't need to clear the full raid. Spirit Vale Wing 1 (Vale Guardian) is the most common entry point. Check LFG for open training runs.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  47: {
    // Identify 100 Pieces of Unidentified Gear
    time_per_stage: 8,
    stage_count:    1,
    time_verified:  false,
    tip:            "Buy 100 Pieces of Common Unidentified Gear from the Trading Post (Blue/Green bags are cheapest), then use 'Identify All' from your inventory in one go. Do this in open world - some instances prevent progress from counting.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  100: {
    // Salvage 50 Items
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  false,
    tip:            "Buy 50 cheap dyes or Pieces of Common Unidentified Gear from the Trading Post and salvage with a Crude Salvage Kit. Pairing with the Identify 100 Gear objective is efficient - identify then salvage the results.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  63: {
    // Complete 3 Fractals in the Fractals of the Mists
    time_per_stage: 25,
    stage_count:    3,
    time_verified:  false,
    tip:            "Tier 1 fractals are quickest - Quickplay or LFG for speed groups. The Fractals portal is in Lion's Arch near Fort Marriner. Allow roughly 75–90 minutes for 3 sequential runs.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  269: {
    // Complete a Convergence or Fractal
    time_per_stage: 8,
    stage_count:    1,
    time_verified:  true,
    tip:            "Complete a single Tier 1 fractal via Quickplay. If you want to do a convergence instead, public groups run every 90 minutes, alternating between Mount Balrior and Outer Nayos.",
    waypoint:       "[&BDAEAAA=]",
    timed:          false,
    // schedule:       ["00:00","01:30","03:00","04:30","06:00","07:30","09:00","10:30","12:00","13:30","15:00","16:30","18:00","19:30","21:00","22:30"],
    priority:       false,
  },

  349: {
    // Complete 5 Quickplay Raids (300 acclaim)
    // ⚠️ VERIFY time estimate
    time_per_stage: 30,
    stage_count:    5,
    time_verified:  false,
    tip:            "⚠️ VERIFY timing. Queue for Quickplay Raids from the group content panel. Each run takes roughly 20–30 minutes depending on group composition and encounter.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  351: {
    // Complete the Guardian's Glade Raid or 10 Quickplay Raids (300 acclaim)
    // ⚠️ VERIFY: Guardian's Glade is a Janthir Wilds raid
    time_per_stage: 40,
    stage_count:    1,
    time_verified:  false,
    tip:            "⚠️ VERIFY. Guardian's Glade is a raid encounter from the Janthir Wilds expansion. A single clear is likely faster than 10 Quickplay Raids for an experienced group. Check LFG or raid communities.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  357: {
    // Complete 5 Quickplay Fractals (150 acclaim)
    // ⚠️ VERIFY time estimate
    time_per_stage: 20,
    stage_count:    5,
    time_verified:  false,
    tip:            "⚠️ VERIFY timing. Queue for Quickplay Fractals from the group content panel. Each run should take approximately 15–20 minutes.",
    waypoint:       null,
    timed:          false,
    priority:       true,
  },

  /* ══════════════════════════════════════════════════════════════
     PvE - SPECIAL / SEASONAL (higher acclaim)
     ⚠️ All entries need in-game verification
     ══════════════════════════════════════════════════════════════ */

  346: {
    // Collect 4 Spears from an Alliance Field Quartermaster (150 acclaim)
    // ⚠️ VERIFY: Janthir Wilds content
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "⚠️ VERIFY. Alliance Field Quartermasters are found in Janthir Wilds maps (requires Janthir Wilds expansion). Check the wiki for Quartermaster locations in Lowland Shore or Janthir Syntri.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  355: {
    // Complete 30 Events in Castora (150 acclaim)
    // ⚠️ VERIFY time estimate
    time_per_stage: 4,
    stage_count:    30,
    time_verified:  false,
    tip:            "⚠️ VERIFY timing. Complete 30 events specifically in the Castora region. Rift hunting in Castora gives 2 event credits per rift and is likely the most efficient approach.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  356: {
    // Collect Any 1 Mini Kela, Mini Sebb, or Mini Dancing Crab (75 acclaim)
    // ⚠️ VERIFY: source of these minis
    time_per_stage: 30,
    stage_count:    1,
    time_verified:  false,
    tip:            "⚠️ VERIFY. These minis appear associated with Janthir Wilds or a seasonal event. Check the Trading Post or the relevant event/expansion content for how to obtain them.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  360: {
    // Complete 15 Repeatable Renown Hearts in Castora (150 acclaim)
    // ⚠️ VERIFY time estimate
    time_per_stage: 5,
    stage_count:    15,
    time_verified:  false,
    tip:            "⚠️ VERIFY timing. Complete 15 repeatable renown hearts (marked with the infinity symbol) in the Castora region - they reset daily.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  361: {
    // Collect 4 Relics from Visions of Eternity Set 2 (150 acclaim)
    // ⚠️ VERIFY: SotO content
    time_per_stage: 30,
    stage_count:    4,
    time_verified:  false,
    tip:            "⚠️ VERIFY. Visions of Eternity content is from Secrets of the Obscure. Set 2 relics are obtained through SotO content. Check the wiki for the current set composition and relic sources.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  362: {
    // Unlock Any 10 Item Skins (150 acclaim)
    // ⚠️ VERIFY: exact count against your API progress_complete
    time_per_stage: 5,
    stage_count:    1,
    time_verified:  false,
    tip:            "⚠️ VERIFY stage count against your API progress_complete. Buy 10 inexpensive items from the Trading Post and unlock their skins (right-click → Unlock Skin), or unlock skins through normal gameplay. Mystic Forge output and salvage-unlocked skins also count.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  363: {
    // Complete 4 Meta-Events in Castora (150 acclaim)
    // ⚠️ VERIFY time estimate
    time_per_stage: 25,
    stage_count:    4,
    time_verified:  false,
    tip:            "⚠️ VERIFY timing. Complete 4 meta-events in the Castora region maps. Check an event timer for Castora meta schedules and plan your session around multiple meta windows.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  366: {
    // Speak with Shaman Palak about the Endless Summer Legendary Ring (75 acclaim)
    // ⚠️ VERIFY: seasonal/Living Story content
    time_per_stage: 5,
    stage_count:    1,
    time_verified:  false,
    tip:            "⚠️ VERIFY. This appears tied to a specific seasonal event or Living Story chapter. Shaman Palak's dialogue may depend on the current in-game season. Check the wiki for their location and any prerequisites.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  /* ══════════════════════════════════════════════════════════════
     WvW - DAILY (10 acclaim)
     ══════════════════════════════════════════════════════════════ */

  98: {
    // Earn 200 WvW Experience
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Earned from any WvW activity - capturing objectives, killing NPCs or players, and completing events. A single camp capture typically provides enough.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  99: {
    // Capture 1 Camp Objective in WvW
    time_per_stage: 8,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Supply camps are the smallest and most accessible WvW objectives. Look for undefended enemy-held camps on any borderland or Eternal Battlegrounds map.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  107: {
    // Capture 1 Sentry Point in WvW
    time_per_stage: 5,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Sentry points are small guard posts scattered throughout WvW maps. They require only a few NPC kills to capture and are usually uncontested.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  139: {
    // Capture 1 Ruin or Shrine Objective in WvW
    time_per_stage: 8,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Ruins are found in Desert Borderlands; shrines in Alpine Borderlands. Both are smaller than towers or keeps and faster to flip.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  155: {
    // Defeat 3 Enemy Invaders in WvW
    time_per_stage: 10,
    stage_count:    3,
    time_verified:  false,
    tip:            "[WvW] Engage enemy players in any WvW map. Roaming near frequently contested supply camps or sentry points gives reliable opportunities.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  187: {
    // Defeat 5 Enemy Guards in WvW
    time_per_stage: 5,
    stage_count:    5,
    time_verified:  false,
    tip:            "[WvW] Enemy NPC guards protect all objectives. Attacking any enemy-held camp or tower clears guards - combine naturally with a capture objective.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  202: {
    // Escort 1 Supply Caravan to Its Destination in WvW
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Supply caravans (dolyaks) move automatically between supply camps and objectives. Stay near the dolyak and defend it until it arrives at its destination.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  28: {
    // Defeat 1 Enemy Supply Caravan in WvW
    time_per_stage: 10,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Enemy dolyaks travel along fixed paths between objectives. Intercept one on a route through enemy territory and kill it before it arrives.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  10: {
    // Participate in 1 Defense Event in WvW
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Defense events trigger when an enemy attacks a friendly objective. Join a map with active siege and respond to defense callouts. Brief participation before the event resolves should be enough for credit.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  353: {
    // Deal 50,000 Damage Using Siege Equipment in WvW
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Operate any siege weapon (Arrow Cart, Ballista, Trebuchet, Catapult, Cannon) during an attack or defense. Arrow Carts against a rushing enemy accumulate damage quickly.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  /* ══════════════════════════════════════════════════════════════
     WvW - WEEKLY (50 acclaim)
     ══════════════════════════════════════════════════════════════ */

  166: {
    // Earn 10,000 WvW Experience
    time_per_stage: 60,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Accumulated across a full WvW session. An active hour of capturing objectives, killing players and NPCs, and participating in events should be sufficient.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  46: {
    // Capture 10 WvW Objectives
    time_per_stage: 8,
    stage_count:    10,
    time_verified:  false,
    tip:            "[WvW] Capture any combination of camps, towers, keeps, or castles. Joining an offensive zerg during an active push is the fastest way to chain captures.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  181: {
    // Capture 5 Camps in WvW
    time_per_stage: 8,
    stage_count:    5,
    time_verified:  false,
    tip:            "[WvW] Supply camps are the most accessible WvW objectives. A roamer or small group can flip camps quickly on quieter borderlands.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  192: {
    // Capture 5 Towers in WvW
    time_per_stage: 15,
    stage_count:    5,
    time_verified:  false,
    tip:            "[WvW] Towers require more players and siege than camps. Join a commander-led zerg during an active offensive push for fastest progress.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  137: {
    // Capture 3 Keeps in WvW
    time_per_stage: 25,
    stage_count:    3,
    time_verified:  false,
    tip:            "[WvW] Keeps require coordinated siege and a sizeable group. Join a commander in Eternal Battlegrounds or a borderland during a full offensive.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  109: {
    // Capture 10 Ruin, Shrine, or Mercenary Camp Objectives in WvW
    time_per_stage: 8,
    stage_count:    10,
    time_verified:  false,
    tip:            "[WvW] Ruins (Desert Borderlands) and shrines (Alpine Borderlands) flip quickly. Mercenary camps require killing a group of NPC mercenaries. All are faster to capture than towers or keeps.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  50: {
    // Defeat 10 WvW Invaders
    time_per_stage: 8,
    stage_count:    10,
    time_verified:  false,
    tip:            "[WvW] Engage enemy players actively. Defending a contested objective gives reliable kill opportunities as enemies push in.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  144: {
    // Defeat 25 Enemy Guards in WvW
    time_per_stage: 3,
    stage_count:    25,
    time_verified:  false,
    tip:            "[WvW] Enemy NPC guards are cleared at every objective you attack. Attacking 4–5 enemy objectives will passively accumulate the full count.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  94: {
    // Destroy 10 Enemy Supply Caravans in WvW
    time_per_stage: 10,
    stage_count:    10,
    time_verified:  false,
    tip:            "[WvW] Enemy dolyaks travel fixed routes between objectives. Intercept them along paths through enemy territory. Quieter borderlands have easier-to-reach dolyaks.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  32: {
    // Escort 6 Allied Supply Caravans to Their Destinations in WvW
    time_per_stage: 10,
    stage_count:    6,
    time_verified:  false,
    tip:            "[WvW] Walk alongside friendly dolyaks as they travel between objectives. Stay nearby and help defend them from interception. This is a passive objective - just keep up with each dolyak.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  206: {
    // Defend 10 WvW Objectives
    time_per_stage: 10,
    stage_count:    10,
    time_verified:  false,
    tip:            "[WvW] Defense credits require participating in a defense event when enemies attack a friendly objective. Stay in an active contested area and respond to attack callouts.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  163: {
    // Restore 50,000 Health to Yourself or Allied Players
    time_per_stage: 30,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Play a healing-focused support build and sustain allies during fights. Healing-heavy builds (Tempest, Druid, Firebrand) in an active zerg accumulate healing rapidly. Self-healing during sustained solo combat also counts.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  85: {
    // Deal 500,000 Damage to Enemy Players in sPvP or WvW
    time_per_stage: 60,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW/PvP] Damage accumulates across the whole session. In WvW, an active hour in large zerg fights builds damage quickly. In sPvP, high-damage power builds reach this faster per match.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  359: {
    // Deal 500,000 Damage Using Siege Equipment in WvW
    time_per_stage: 45,
    stage_count:    1,
    time_verified:  false,
    tip:            "[WvW] Operate siege weapons during active objective fights. Trebuchets and Catapults deal high damage to structures; Arrow Carts deal high damage to players during rushes.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  /* ══════════════════════════════════════════════════════════════
     PvP - DAILY (10 acclaim)
     ══════════════════════════════════════════════════════════════ */

  2: {
    // Compete in 1 Player vs. Player Team Battle
    time_per_stage: 12,
    stage_count:    1,
    time_verified:  false,
    tip:            "[PvP] Queue for any unranked or ranked match from the PvP lobby. One match completion - win or loss - is sufficient.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  18: {
    // Defeat 3 Enemy Players in a Structured PvP Match
    time_per_stage: 12,
    stage_count:    3,
    time_verified:  false,
    tip:            "[PvP] Kill 3 enemy players in a single match. Play an offensive build and engage in team fights rather than capping empty points.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  37: {
    // Earn 50 Rank Points in PvP Matches
    time_per_stage: 12,
    stage_count:    1,
    time_verified:  false,
    tip:            "[PvP] Rank points are earned from participating in matches regardless of outcome. A single match typically awards 30–50 rank points - two matches should comfortably cover this.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  78: {
    // Earn a Top Scoreboard Stat on Your Team in a PvP Match
    time_per_stage: 15,
    stage_count:    1,
    time_verified:  false,
    tip:            "[PvP] Finish a match leading your team in any one category - kills, damage, healing, or capture points. Focusing on a single stat and sustaining that focus throughout the match increases your chance of leading it.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  157: {
    // Earn 1 reward from a PvP Reward Track
    time_per_stage: 12,
    stage_count:    1,
    time_verified:  false,
    tip:            "[PvP] PvP Reward Track progress is earned in every match. One full match should trigger at least one reward chest. Make sure an active reward track is selected before queuing.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  174: {
    // Deal 100,000 Damage to Enemy Players in PvP
    time_per_stage: 12,
    stage_count:    1,
    time_verified:  false,
    tip:            "[PvP] Play a power DPS build and focus on combat. One or two matches with a damage-focused build is typically sufficient.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  /* ══════════════════════════════════════════════════════════════
     PvP - WEEKLY (50 acclaim)
     ══════════════════════════════════════════════════════════════ */

  91: {
    // Defeat 30 Players in Structured PvP
    time_per_stage: 12,
    stage_count:    5,
    time_verified:  false,
    tip:            "[PvP] Kill 30 enemy players across multiple matches - roughly 5–6 kills per match with an offensive build. Engage actively in team fights rather than holding points passively.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  108: {
    // Compete in 10 Structured PvP Matches
    time_per_stage: 12,
    stage_count:    10,
    time_verified:  false,
    tip:            "[PvP] Complete 10 matches - win or loss both count. Unranked reduces pressure. Allow roughly 2 hours depending on queue times.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  110: {
    // Earn a Top Scoreboard Stat on Your Team in a PvP Match 5 Times
    time_per_stage: 15,
    stage_count:    5,
    time_verified:  false,
    tip:            "[PvP] Lead your team in any one scoreboard category across 5 separate matches. Specialising in one measurable stat and maintaining focus across multiple matches is most reliable.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  141: {
    // Defeat 3 Enemies While Defending a Capture Point in Rated PvP Conquest
    time_per_stage: 15,
    stage_count:    3,
    time_verified:  false,
    tip:            "[PvP - Ranked only] Stand on a friendly capture point and kill 3 enemies who contest it. A tanky or bruiser build works well for holding points under pressure.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  80: {
    // Neutralize 5 Enemy Capture Points in Rated PvP Conquest
    time_per_stage: 15,
    stage_count:    5,
    time_verified:  false,
    tip:            "[PvP - Ranked only] Neutralize (not necessarily fully capture) 5 enemy-held points across one or more matches. Roaming between contested points is more efficient than fully capping each one.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  145: {
    // Win 3 Structured PvP Rated Games
    time_per_stage: 15,
    stage_count:    3,
    time_verified:  false,
    tip:            "[PvP - Ranked only] Win 3 ranked matches. Play a meta build in a role you're comfortable with. Allow more time than 3 matches depending on win rate.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  171: {
    // Win 5 Games in Structured PvP
    time_per_stage: 15,
    stage_count:    5,
    time_verified:  false,
    tip:            "[PvP] Win 5 matches - ranked or unranked. Allow 1.5–2.5 hours depending on queue times and win rate.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  36: {
    // Win 1 Game in Conquest Mode after Completing the Map's Secondary Objective
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  false,
    tip:            "[PvP] Each Conquest map has a secondary objective (e.g., killing the lord, capturing a shrine or relic). Complete the map's secondary objective during the match AND win. Coordinating the secondary with your team improves success rate.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  167: {
    // Participate in 1 PvP Tournament Match
    // ⚠️ VERIFY: Tournaments are timed - add schedule if known
    time_per_stage: 20,
    stage_count:    1,
    time_verified:  true,
    tip:            "[PvP] Automated Tournaments run on a fixed schedule - EU servers at 12:00, 15:00, 18:00, 21:00 UTC; NA servers at 00:00, 03:00, 09:00, 21:00 UTC. Sign up via the PvP panel before the start time. Participation (not a win) is sufficient for credit. The schedule shown reflects all possible windows - only those matching your region will be available.",
    waypoint:       null,
    timed:          true,
    schedule:       ["00:00","03:00","09:00","12:00","15:00","18:00","21:00"],
    priority:       true,
  },

  177: {
    // Earn 5 Rewards from Structured PvP Reward Tracks
    time_per_stage: 15,
    stage_count:    5,
    time_verified:  false,
    tip:            "[PvP] Play 5+ matches with an active reward track. Each match progresses the track and triggers reward pips at regular intervals. Combine naturally with other PvP objectives.",
    waypoint:       null,
    timed:          false,
    priority:       false,
  },

  184: {
    // Earn 1,000 PvP Rank Points
    time_per_stage: 12,
    stage_count:    5,
    time_verified:  false,
    tip:            "[PvP] Rank points accumulate across all PvP matches regardless of outcome - roughly 30–200 points per match depending on performance. Expect 6–10 matches to complete this.",
    waypoint:       null,
    timed:          false,
    priority:       false,
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
       priority:       false,
     },
     ════════════════════════════════════════════════════════════ */
};

/* ════════════════════════════════════════════════════════════════
   VERIFICATION CHECKLIST
   ────────────────────────────────────────────────────────────────
   Search for "⚠️ VERIFY" to jump to each flagged entry.

   1. WORLD BOSS & CONVERGENCE SCHEDULES - ✅ RESOLVED
      Schedules for ids 19, 31, 55, 60, 134, 159, 178, 196, 269
      were derived from the GW2 wiki event timer JSON by parsing
      the core-wb (regular bosses) and public-con (Convergences)
      sequence data. The epoch is UTC midnight. All are now set
      to timed:true with correct schedule arrays.

   2. PvP TOURNAMENT SCHEDULE - ✅ RESOLVED
      Id 167 schedule derived from core-ateu (EU) and core-atna
      (NA) sequences in the event timer JSON. Combined window list
      included; only windows matching your server region will
      actually be available in-game.

   3. JUMPING PUZZLE WAYPOINTS - needs in-game copy-paste
      (ids: 4, 38, 44, 56, 61, 74, 101, 105, 116, 129, 130,
            146, 148, 156, 161, 170, 180, 186, 189)
      Hover over the nearest waypoint in-game, Ctrl+C, paste here.

   4. JUMPING PUZZLE LOCATIONS - unconfirmed
      (ids: 40, 44, 61, 105, 116, 146, 148, 170)
      Check the GW2 wiki for map, waypoint, and route.

   5. ENEMY FACTION STAGE COUNTS - estimated at 50
      (ids: 70, 77, 143, 150, 190, 193, 272, 334)
      Check the API response (progress_complete) for your current
      objective to confirm the actual count required.

   6. NEW & SEASONAL CONTENT - best-guess tips only
      (ids: 346, 349, 351, 355, 356, 357, 360, 361, 362, 363, 366)
      Verify in-game or on the wiki.

   6. PvP TOURNAMENT SCHEDULE (id: 167)
      Set timed:true and add schedule if UTC windows are known.

   7. TIME VERIFICATION - set time_verified:true after timing in-game
      Currently all entries have time_verified:false.
      When you've run an objective and know how long it actually takes,
      update time_per_stage, stage_count, and flip time_verified:true.
   ════════════════════════════════════════════════════════════ */
