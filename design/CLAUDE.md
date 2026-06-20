# CLAUDE.md

This project is the **Questify Design System**. Before writing or editing any UI:

1. Read **[`AGENTS.md`](AGENTS.md)** — the canonical brief (the laws, setup for any stack, component contract, file map).
2. Read **[`readme.md`](readme.md)** — full design guide (product context, voice, visual foundations, iconography).

**Core rules:** style only via the CSS custom properties in `styles.css` (never hardcode hex/px that a token covers); reuse the primitives in `components/**` (their `.d.ts` is the prop contract); support light **and** dark by toggling `data-theme` on the root; keep the Questify voice and look (gold-on-parchment, dark text on gold, the chunky "pop" CTA, Lucide icons, sparing emoji). Match `ui_kits/questify/index.html` for layout and interactions.
