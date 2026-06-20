# AGENTS.md — Questify Design System

> **You are implementing UI for Questify, a gamified RPG task manager.** This repo ships a complete design system. Respect it: do not invent colors, fonts, spacing, or component styles. Read this file, then [`readme.md`](readme.md), before writing UI.
>
> This file is the canonical agent brief. `CLAUDE.md` and `.cursorrules` just point here.

## The laws (non-negotiable)

1. **Style only through the tokens.** Use the CSS custom properties from `styles.css` (`var(--primary)`, `var(--surface)`, `var(--text-strong)`, `var(--space-4)`, `var(--radius-lg)`, …). **Never hardcode a hex, px font-size, or shadow** that a token already covers.
2. **Components are a contract.** Reuse the primitives in `components/**`. Each has a `.d.ts` (props) and `.prompt.md` (usage) — read them and keep the prop names/variants. Reimplement in your framework if needed; don't redesign.
3. **Light & dark are required.** All colors come in both. Theme by setting `data-theme="dark"` (or class `.dark`) on a root element — semantic tokens flip automatically. Never branch colors in JS.
4. **Voice:** RPG metaphor, second person, playful-but-clean (quests / XP / Gold / monsters / Reward Forge). Title Case for nav & titles, sentence case for body. Emoji sparingly, never as icons — use **Lucide** icons.
5. **Don't break the feel:** dark text on gold primary (`--on-primary`), the chunky "pop" CTA edge (one per view), warm-cast shadows, generous rounding, transform-only entrance animations (never animate `opacity:0→1`).

## Setup (any stack)

**1. Ship the stylesheet.** Copy `styles.css` + the `tokens/` folder into your app and import it once at the entry point:
```
// React/Vite/Next: in your root layout or main.tsx
import "@/design-system/styles.css";
```
```html
<!-- plain HTML -->
<link rel="stylesheet" href="/design-system/styles.css" />
```
This loads all tokens and the webfonts (Fredoka, Plus Jakarta Sans, JetBrains Mono via Google Fonts). For offline/self-hosted, swap `tokens/fonts.css` for local `@font-face`.

**2. Dark mode.** Toggle on the root:
```js
document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
```

**3. (Optional) Tailwind users** — map tokens so utilities resolve to them, then keep using `bg-primary`, `text-strong`, `p-4`, `rounded-lg`:
```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: "var(--primary)", accent: "var(--accent)",
      surface: "var(--surface-raised)", "text-strong": "var(--text-strong)",
      "text-body": "var(--text-body)", "text-muted": "var(--text-muted)",
      success: "var(--success)", danger: "var(--danger)", info: "var(--info)",
    },
    borderRadius: { md: "var(--radius-md)", lg: "var(--radius-lg)", xl: "var(--radius-xl)" },
    boxShadow: { sm: "var(--shadow-sm)", md: "var(--shadow-md)", lg: "var(--shadow-lg)" },
    fontFamily: { display: "var(--font-display)", body: "var(--font-body)", mono: "var(--font-mono)" },
  }
}
```

**4. Components.** The primitives in `components/**` are React (`.jsx`). On a React stack, copy them in and import. On Vue/Svelte/Angular/SwiftUI/etc., port them — the `.d.ts` is the prop spec and the `.prompt.md` shows intended usage and variants. Keep names: `Button` (variants `primary|accent|secondary|ghost|danger`, `pop`, sizes), `QuestCard`, `XpBar`, `CurrencyPill`, `MonsterCard`, `AchievementBadge`, `DifficultyStars`, plus `Input`/`Checkbox`/`Switch`/`Tag`/`Badge`/`Avatar`/`Card`/`Tabs`/`Dialog`/`Toast`.

## Reference the real thing
- `ui_kits/questify/index.html` — **interactive** recreation of the app (dashboard, quest builder, achievements, light/dark). Open it to see exact layout, spacing, and interactions to match.
- `guidelines/**` — visual specimen cards for type, color, spacing.
- `figma/` — the same tokens as DTCG JSON for Figma (design parity).

## File map
| Path | What |
| --- | --- |
| `styles.css` | single import — pulls in all tokens + fonts |
| `tokens/` | colors (light+dark), typography, spacing, effects, base reset |
| `components/core/**`, `components/game/**` | primitives + `.d.ts` contracts + `.prompt.md` usage |
| `ui_kits/questify/` | interactive app reference + its README |
| `readme.md` | full design guide: context, voice, visual foundations, iconography |
| `figma/` | DTCG token JSON + Figma import guide |

## Do / Don't
- ✅ `color: var(--text-strong)` · ❌ `color: #1f1a12`
- ✅ `padding: var(--space-4)` · ❌ `padding: 16px`
- ✅ reuse `<Button variant="primary" pop>` · ❌ a new bespoke button
- ✅ Lucide icons · ❌ emoji as icons, hand-drawn SVG icon sets
- ✅ `data-theme` flips colors · ❌ `if (dark) color = '#...'`
- ✅ match `ui_kits/questify/index.html` · ❌ a new visual direction
