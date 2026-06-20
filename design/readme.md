# Questify Design System

A warm, adventurous design system for **Questify** — a gamified RPG task manager that turns daily work into quests. Built for demo, training, and educational use, and packaged so it can be carried to a **coding agent** (production implementation) or to **Figma** (token + style mapping).

> **Vibe:** clearly fun, but clean and usable — closer to Duolingo than Habitica. Treasure-gold and ember on warm parchment. Friendly rounded display type over a precise UI sans.

---

## 1. Product context

Questify ([source: `uploads/Questify_SRS.md`](uploads/Questify_SRS.md)) transforms task management into an RPG adventure for knowledge workers (developers, designers, PMs; students & indie creators secondary). Core ideas the design must serve:

- **Quests** — tasks with difficulty (★☆☆–★★★), tags, deadlines, sub-quests, templates.
- **Gamification** — avatars/classes, XP & levels (`XP = Base × Difficulty × (1 + streak%) × Deadline`; curve `Fn = 100 × n^1.6`), a Reward Forge (⚔️ Gold + 🎟️ Guild Tokens), achievements, and **Procrastination Monsters** spawned by overdue tasks.
- **Tone** — playful/punny by default, with Professional and silent options.
- **Surfaces** — PWA web app (React), offline-first, light/dark, i18n-ready.

**This is an original system** designed from the SRS — not a recreation of any existing product. Habitica / Trello / Duolingo / Slack are cited in the SRS only as *mood* references.

### Sources
- SRS: `uploads/Questify_SRS.md` (v1.0)
- No codebase or Figma file was provided — foundations were authored from the SRS + the agreed art direction.

---

## 2. Content fundamentals (voice & copy)

The product speaks like a **witty dungeon master who respects your time** — playful framing, never childish, never in the way of the work.

- **RPG metaphor, applied consistently.** Tasks are *quests*, overdue tasks spawn *monsters*, completing things earns *XP* and *Gold*, the shop is the *Reward Forge*, progress is *leveling up*.
- **Voice:** second person ("your quest log", "you've earned 3 of 6"). Warm, encouraging, lightly punny. Verbs are active and a little heroic: *Start quest, Claim, Battle, Slay the backlog, Defeat the inbox*.
- **Casing:** Title Case for nav + screen titles ("Today's Quests", "Reward Forge"); sentence case for body and helper text. Achievement names are Title Case and characterful ("First Blood", "Crunch-Slayer", "Night Coder").
- **Numbers are celebrated.** XP, Gold, streaks, and levels are first-class — shown in mono, often with a `+` ("+240 XP", "7-day streak", "Lv 14").
- **Tone modes.** Default = playful. Copy should degrade gracefully to a **Professional** register (drop the puns, keep it concise) and **silent** mode (no nudges) per the SRS.
- **Emoji:** used **sparingly** as seasoning, not structure — fine in a celebratory toast or a single inline flourish; **not** as iconography, bullets, or button labels. Use the Lucide icon set for all UI affordances.

**Examples**
- Toast (success): *"Quest complete! +240 XP · +35 Gold"*
- Monster alert: *"Spawned by 3 overdue quests · blocking Gold until defeated"*
- Empty state: *"No quests here. Time for a side-quest?"*
- Professional variant of the above toast: *"Task complete. +240 XP."*

---

## 3. Visual foundations

### Color
Warm and adventurous. Two brand ramps plus warm-tinted neutrals; functional and rarity colors round it out. Full definitions in [`tokens/colors.css`](tokens/colors.css).

- **Primary — Gold** (`--gold-500`, `--primary`): treasure gold for primary actions, XP, level-ups. Primary buttons use **dark text on gold** (`--on-primary`), not white.
- **Accent — Ember** (`--ember-500`, `--accent`): energy & urgency — links, secondary CTAs, streaks, and Procrastination Monsters.
- **Neutrals — Warm** (`--warm-50…950`): parchment backgrounds → ink text. **Never pure grey** — everything carries a faint warm cast. Text on light = `--warm-900 / 700 / 500`.
- **Functional:** success green, danger red, warning amber, info teal-blue — each with a `-soft` tint.
- **Rarity ramp** (gear/achievements): common (warm grey) → rare (blue) → epic (arcane violet) → legendary (gold + glow). Arcane violet is the *only* cool brand hue and is used **sparingly**.
- **Two-layer model:** raw palette (`--gold-500`) → semantic aliases (`--primary`, `--surface`, `--text-strong`). **Light is `:root`; dark overrides under `[data-theme="dark"]` / `.dark`.** Map the palette to a Figma "Primitives" collection and the semantic layer to a "Tokens" collection with Light/Dark modes.

### Type
Defined in [`tokens/typography.css`](tokens/typography.css).
- **Display — Fredoka** (rounded, friendly): headings, quest titles, big numerals. Weights 400–700, tracking −0.02em.
- **Body — Plus Jakarta Sans** (geometric-humanist): UI text, paragraphs, labels. 400–800.
- **Mono — JetBrains Mono**: formulas, stats, Gold/XP readouts, token values, code.
- Scale: 12 → 60px (`--text-xs`…`--text-6xl`). Minimum interactive text 14px.

### Shape, depth & motion
Defined in [`tokens/effects.css`](tokens/effects.css) and [`tokens/spacing.css`](tokens/spacing.css).
- **Corners:** generously rounded — cards `--radius-lg` (16px), modals `--radius-xl` (22px), pills/chips `--radius-pill`. Inputs/buttons `--radius-md`/`lg`.
- **Cards:** warm white `--surface-raised`, 1px `--border`, `--radius-lg`, soft warm shadow (`--shadow-sm`). Interactive cards lift (`translateY(-2px)` + `--shadow-lg`) on hover. **No colored-left-border cards.**
- **Shadows:** warm brown cast (never neutral grey), `--shadow-xs…xl`. Inset shadow on progress tracks.
- **Signature treatment — the "pop" edge:** the primary CTA carries a chunky 3D bottom edge (`--pop-primary`, a hard `0 4px 0` shadow) that **flattens on press** (`translateY(3px)`). This is the most distinctive interaction — reserve it for the single hero action per view.
- **Spacing:** 4px base grid (`--space-1…24`). Sidebar 264px, top bar 64px.
- **Motion:** quick and slightly springy. `--ease-spring` (overshoot) for toggles, checks, and pop-ins; `--ease-out` for fades/slides. Durations 120/200/320ms. **Animate transform, not `opacity:0→1`, for entrances**, so content is never hidden if an animation is paused/disabled.
- **Glow:** reserved for legendary/level-up moments only (`--glow-gold`, `--glow-arcane`).
- **Backgrounds:** flat warm parchment (`--bg-base`). One restrained brand gradient is allowed — the XP banner uses `surface → primary-soft`. No noisy textures, no purple hero gradients.

---

## 4. Iconography

- **Icon set: [Lucide](https://lucide.dev)** — clean, rounded, 2px-stroke outline icons that pair naturally with Fredoka's roundness. Loaded from CDN (`https://unpkg.com/lucide@latest`) in the specimen cards and UI kit. For production, install `lucide-react`.
  - *Substitution flag:* Lucide is the chosen set (no proprietary icons were provided). If you prefer another rounded outline set, swap the CDN/import — stroke weight 2 and rounded joins are the requirement.
- **Common glyphs:** `shield` (logo mark), `scroll-text` (quests), `trophy` (achievements), `gem` (Reward Forge), `user-round` (character), `swords`/`sword` (battle/quest), `skull` (monsters), `flame` (streaks), `crown`/`moon`/`bug` (achievements), `clock`/`calendar` (deadlines), `plus`, `x`, `check`, `sparkles`, `party-popper`.
- **Brand mark:** the Questify wordmark pairs the `shield` glyph in a gold "pop" tile with the Fredoka name (see the UI-kit sidebar). No raster logo asset was supplied; the mark is composed from the icon + type tokens.
- **Currency & difficulty** are *not* emoji: Gold/Guild Tokens render as minted **coin glyphs** (`CurrencyPill`) and difficulty as **gold star SVGs** (`DifficultyStars`).
- **Emoji:** decorative only and rare (e.g. a single ⚔ in an empty state). Never load-bearing.

---

## 5. Index / manifest

**Root**
- [`styles.css`](styles.css) — global entry point; `@import`s every token + font file. **Consumers link this one file.**
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill front matter for use in Claude Code.

**`tokens/`** — `fonts.css`, `colors.css` (light + dark), `typography.css`, `spacing.css`, `effects.css`, `base.css` (the only token file with element rules).

**`guidelines/`** — foundation specimen cards (Design System tab): type (display/body/mono/scale), colors (gold, ember, neutrals, status, rarity, semantic light+dark), spacing (scale, radii, shadows).

**`components/`** — reusable React primitives (`.jsx` + `.d.ts` contract + `.prompt.md` usage), each group with one `@dsCard` HTML specimen:
- `core/` — Button, IconButton, Input, Checkbox, Switch, Tag, Badge, Avatar, Card, Tabs, Dialog, Toast
- `game/` — QuestCard, XpBar, DifficultyStars, AchievementBadge, CurrencyPill, MonsterCard

**`ui_kits/questify/`** — interactive app recreation ([`index.html`](ui_kits/questify/index.html)) + [`README.md`](ui_kits/questify/README.md). Dashboard, Quest Builder, Achievements, light/dark.

### Consuming this system
- **HTML / coding agent:** `<link rel="stylesheet" href="styles.css">` then style with the CSS custom properties. Import primitives from `components/**`.
- **Figma:** recreate `tokens/colors.css` palette as **Primitives** variables and the semantic block as **Tokens** with **Light/Dark** modes; mirror `typography.css` as text styles and `effects.css`/`spacing.css` as effect/number variables. Token names are 1:1 with the CSS.
