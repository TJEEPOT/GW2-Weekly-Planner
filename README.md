# ⚗ Wizard's Vault Planner

A lightweight, single-page tool for Guild Wars 2 players to schedule and
prioritise their daily and weekly Wizard's Vault objectives.

No build step, no dependencies, no server required. Works entirely in the
browser using the official GW2 API.

---

## Features

- Fetches your current daily and weekly objectives live from the GW2 API
- Schedules objectives around timed world-boss events, with a configurable
  pre-event buffer so you're never caught mid-objective when Tequatl spawns
- Shows estimated start times in your local timezone
- Waypoint codes - click to copy straight into GW2
- Manual tick-off (persists across refreshes via `localStorage`)
- API-completed objectives automatically collapse to the bottom

---

## Deployment (GitHub Pages)

1. Fork or clone this repository.
2. Push to GitHub.
3. Go to **Settings → Pages** and set the source to your `main` branch, root `/`.
4. The planner will be live at `https://<your-username>.github.io/<repo-name>/`.

---

## Local development

Because the JavaScript uses ES modules (`import`/`export`), you need to serve
the files over HTTP rather than opening `index.html` directly from the
filesystem (browsers block module imports on `file://` URLs).

The simplest options:

```bash
# Python 3
python -m http.server 8080

# Node (npx, no install needed)
npx serve .

# VS Code
# Install the "Live Server" extension, then right-click index.html → Open with Live Server
```

Then open `http://localhost:8080` in your browser.

---

## Adding or updating objective metadata

All objective metadata lives in **`js/meta.js`**. Each entry is keyed by the
numeric objective id returned by the GW2 API.

### Field reference

| Field | Type | Description |
|---|---|---|
| `time_per_stage` | `number` | Minutes to reach the objective, complete one stage, and be ready for the next |
| `stage_count` | `number` | Number of stages that make up the full objective (often equals `progress_complete` from the API, but not always) |
| `tip` | `string` | Advice shown to the player - fastest route, useful tricks, alternatives |
| `waypoint` | `string\|null` | GW2 waypoint code (e.g. `[&BNABAAA=]`). Set to `null` if there's no single best starting point |
| `timed` | `boolean` | `true` if the objective is only available at specific UTC times |
| `schedule` | `string[]` | *(only when `timed: true`)* UTC spawn times in `"HH:MM"` format |
| `priority` | `boolean` | `true` = schedule this before non-priority items; always `true` for timed objectives |

### Adding a new objective

1. Find the objective's `id` from the API response or from the
   [GW2 wiki](https://wiki.guildwars2.com/wiki/Wizard%27s_Vault/Easy_objectives).
2. Copy the template at the bottom of `js/meta.js` and fill in the fields.
3. Save - the page will pick it up on the next refresh.

---

## API key permissions

Your key needs the following scopes enabled on the
[GW2 API key management page](https://account.arena.net/applications):

- **account**
- **progression**

The key is stored only in your browser's `localStorage` and is sent
exclusively to `api.guildwars2.com`. It is never sent anywhere else.

---

## Contributing

Pull requests for new objective entries in `js/meta.js` are very welcome -
especially timing data and waypoints verified in-game.
