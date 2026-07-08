# ⚗ Wizard's Vault Planner

A lightweight, single-page tool for Guild Wars 2 players to schedule and
prioritise their daily and weekly Wizard's Vault objectives.

No build step, no dependencies, no server required - works entirely in the
browser and communicates only with the official GW2 API.

---

## Features

- **API mode** — fetch your current objectives live from the GW2 API
- **Manual mode** — select objectives yourself, useful when the API hasn't
  updated yet after logging in (can take up to 20 minutes)
- Schedules objectives around timed world-boss and meta-event windows, with
  a configurable pre-event buffer so you're never caught mid-task
- Shows estimated start times in your local timezone
- Waypoint codes - click to copy straight into GW2
- Manual tick-off (persists across refreshes via `localStorage`)
- API-completed objectives collapse to the bottom
- Automatic expiry — daily objectives clear at 00:00 UTC, weekly objectives
  at 07:30 UTC Monday; the page notifies you when this happens

---

## Two ways to use it

### Load from API
Enter your GW2 API key and click **Load from API**. Your current daily and
weekly objectives are fetched directly from ArenaNet. The page never
auto-loads — you must press the button each time you want fresh data.

> **Note:** The GW2 API caches progress for up to an hour after you log
> in. If your objectives look out of date, use Manual mode while you wait.

### Manual mode
Click **Select Objectives Manually** to open the objective picker. Search
or scroll through all available daily and weekly objectives, click to
select them, and close the picker to generate your schedule instantly —
no API key needed.

---

## Deployment (GitHub Pages)

1. Fork or clone this repository.
2. Push to GitHub.
3. Go to **Settings → Pages** and set the source to your `main` branch, root `/`.
4. The planner will be live at
   `https://<your-username>.github.io/<repo-name>/`.

---

## Local development

ES modules require an HTTP server — you cannot open `index.html` directly
from the filesystem. Options:

```bash
# Python 3
python -m http.server 8080

# Node (no install needed)
npx serve .

# VS Code - install "Live Server", right-click index.html → Open with Live Server
```

Then open `http://localhost:8080`.

---

## Adding or updating objective metadata

All objective metadata lives in **`js/meta.js`**. Each entry is keyed by the
numeric objective id returned by the GW2 API.

### Field reference

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Display name from the GW2 API |
| `track` | `string` | `"PvE"`, `"PvP"`, or `"WvW"` |
| `acclaim` | `number` | Astral Acclaim reward. Used to classify daily (10) vs weekly (50) in the picker |
| `time_per_stage` | `number` | Minutes to reach the objective, complete one stage, and be ready for the next |
| `stage_count` | `number` | Number of stages that make up the full objective |
| `time_verified` | `boolean` | `false` = timing is estimated. Set to `true` once timed in-game |
| `tip` | `string` | Advice shown to the player |
| `waypoint` | `string\|null` | GW2 waypoint code. `null` if no single best starting point |
| `timed` | `boolean` | `true` if only available at specific UTC times |
| `schedule` | `string[]` | *(only when `timed: true`)* UTC spawn times as `"HH:MM"` strings |
| `priority` | `PRIORITY` | `PRIORITY.HIGH` = schedule first; `PRIORITY.NORMAL` = standard; `PRIORITY.LOW` = passive/schedule last |

### Priority levels

```js
PRIORITY.HIGH   // Timed events; anything you'd stop other tasks to catch
PRIORITY.NORMAL // Active objectives worth doing deliberately
PRIORITY.LOW    // Completes passively alongside other objectives
```

### Adding a new objective

1. Find the `id` from the API or from the
   [GW2 wiki](https://wiki.guildwars2.com/wiki/Wizard%27s_Vault/Easy_objectives).
2. Copy the template at the bottom of `js/meta.js` and fill in the fields.
3. Save - the page picks it up on the next refresh.

---

## API key permissions

Your key needs the following scopes on the
[GW2 API key management page](https://account.arena.net/applications):

- **account**
- **progression**

The key is stored only in your browser's `localStorage` and sent exclusively
to `api.guildwars2.com` over HTTPS. It is never sent anywhere else.

---

## Project structure

```
/
├── index.html                    Main HTML shell
├── css/
│   └── styles.css                All visual styles
├── js/
│   ├── meta.js                   Objective metadata — edit this to add/update objectives
│   ├── api.js                    GW2 API calls
│   ├── scheduler.js              Timeline building and conflict resolution
│   ├── render.js                 DOM rendering and UI event binding
│   ├── picker.js                 Manual objective selection, persistence, expiry
│   ├── dialog.js                 Styled confirm dialogue
│   └── main.js                   Entry point — wires everything together
├── gw2_objective_checker/
│   ├── check_objectives.py       Detects new/removed objectives and posts to Discord
│   └── script_result.py          Shared result type for the build checker system
└── README.md
```

---

## Contributing

Pull requests for objective metadata in `js/meta.js` are welcome - especially
verified timing data, waypoints, and tips confirmed in-game.
