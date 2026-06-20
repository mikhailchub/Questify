# Questify — App UI Kit

A high-fidelity, **interactive** recreation of the Questify web app, built entirely on the design-system tokens (`/styles.css`) and mirroring the documented component primitives.

## Run it
Open `index.html`. It is self-contained (React + Babel + Lucide from CDN) and links the design-system `styles.css` for all colors, type, spacing, and effects. No build step.

## Screens & interactions
| Surface | What it shows | Try |
| --- | --- | --- |
| **Today's Quests** (dashboard) | XP/level banner, Procrastination-Monster alert, Today/Done tabs, quest list (difficulty stars, tags, deadlines, XP rewards) | Tick a quest → XP bar fills, Gold increments, a "Quest complete!" toast fires |
| **Quest Builder** (modal) | Title, tap-to-set difficulty stars, tag entry, deadline, live reward preview | Open via **New quest**; pick difficulty, add tags, **Create quest** prepends it to the log |
| **Achievements** | Rarity-tiered medal grid with locked/unlocked + progress | Switch via the sidebar |
| **Reward Forge / Character** | Intentional placeholders (not in scope for this demo) | — |
| **Theme** | Full light **and** dark token sets | Toggle the ☾/☀ button in the top bar |

## Composition
`index.html` is the runnable recreation. For production, compose the real primitives instead of the inlined copies here:

- Shell: `Avatar`, `Tabs`, `IconButton`, `Button`
- Dashboard: `XpBar`, `QuestCard`, `MonsterCard`, `CurrencyPill`, `DifficultyStars`, `Tabs`
- Builder: `Dialog`, `Input`, `DifficultyStars`, `Tag`, `Button`
- Achievements: `AchievementBadge`, `Card`

See each component's `.prompt.md` under `/components/**` for usage. The kit deliberately re-implements lightweight, mostly-cosmetic versions inline so the demo runs with zero bundling; treat the `/components` source as the contract.

## Notes
- Icons are [Lucide](https://lucide.dev) (`shield`, `scroll-text`, `trophy`, `gem`, `swords`, `skull`, `flame`, `crown`, …) — see the Iconography section of the root `readme.md`.
- Entry animations animate **transform only** (never `opacity:0`→`1`) so content is never gated on an animation completing.
