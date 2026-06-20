---
name: questify-design
description: Use this skill to generate well-branded interfaces and assets for Questify, a gamified RPG task-manager (warm gold + ember, friendly rounded type, light/dark). Use for production code or throwaway prototypes/mocks/decks. Contains design guidelines, color/type/spacing tokens, fonts, icon guidance, reusable React components, and an interactive UI kit.
user-invocable: true
---

Read `readme.md` in this skill first — it covers product context, voice/copy, visual foundations, iconography, and a full file manifest. Then explore the other files:

- `styles.css` — link this one file to inherit all tokens (it `@import`s everything in `tokens/`).
- `tokens/` — colors (light + dark), typography, spacing, effects. Token names map 1:1 to Figma variables.
- `components/core/**` and `components/game/**` — reusable React primitives, each with a `.d.ts` props contract and a `.prompt.md` usage example. Read the `.prompt.md` before using a component.
- `ui_kits/questify/index.html` — interactive recreation of the app (dashboard, quest builder, achievements, light/dark) to use as a layout reference.
- `guidelines/**` — foundation specimen cards.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and produce static HTML that links `styles.css` and uses the documented tokens, Lucide icons, and the playful-but-clean voice. If working on production code, copy assets and follow the rules here to design as a brand expert.

If invoked with no other guidance, ask what the user wants to build, ask a few focused questions, then act as an expert designer who outputs HTML artifacts or production code as needed. Keep the Questify voice (quests/XP/Gold/monsters, second person, sparing emoji) and the warm gold-on-parchment look with the chunky "pop" primary button.
