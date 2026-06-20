# Questify → Figma Variables

DTCG-format token files ready to import as **Figma Variables**. Works on a **free** Figma plan (which allows only one mode per collection — so Light and Dark import as **separate collections**).

## Files
| File | Import as collection | Type |
| --- | --- | --- |
| `Questify.Primitives.tokens.json` | **Questify / Primitives** | raw color ramps (warm, gold, ember, green, red, blue, arcane) |
| `Questify.Light.tokens.json` | **Questify / Light** | semantic roles (bg, surface, text, primary, accent, status, game) — light values |
| `Questify.Dark.tokens.json` | **Questify / Dark** | same roles — dark values |
| `Questify.Scale.tokens.json` | **Questify / Scale** | number variables: font-size, space, radius |

Values in Light/Dark are **resolved** (real hex, not aliases) so they import cleanly with no cross-collection linking step.

## Import — native (no plugin, no paid plan)
1. Open the **Variables** panel (right sidebar → *Local variables*, or Assets tab).
2. Click the **⋯ / import** control → **Import** and choose a JSON file. Figma reads DTCG `.tokens.json` and creates a collection of variables (nested groups become `group/name`).
3. Repeat for each of the 4 files. Rename each resulting collection per the table above.

> If your build doesn't show the native import button, use a free community plugin instead — search **"Variables JSON Import"** or **"JSON Variables Importer"** and point it at the same files.

## Using them
- Apply **Light** colors as you design; to preview dark, swap fills to the **Dark** collection (on a paid plan you'd instead add Dark as a second *mode* on one collection and toggle).
- `Scale` numbers drive spacing/padding, corner radius, and font size.
- Names match the CSS custom properties in `/tokens` 1:1 (`primary/default` ↔ `--primary`, `space/4` ↔ `--space-4`), so design and code stay in sync.

## Fonts (set up manually)
Figma variables don't carry fonts. Install from Google Fonts and create text styles:
- **Fredoka** — display / headings / quest titles
- **Plus Jakarta Sans** — body / UI
- **JetBrains Mono** — numbers / formulas / code
