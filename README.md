# Questify 🛡️⚔️

> A gamified RPG task manager that transforms daily work into epic quests.

**Live Site:** Deployed to GitHub Pages via GitHub Actions (see `.github/workflows/deploy.yml`).

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Vite + React 18 + TypeScript |
| Persistence | IndexedDB (native promise wrapper) |
| Design System | Custom token-based CSS (`design/styles.css` + `design/tokens/`) |
| Icons | [Lucide React](https://lucide.dev) |
| Deployment | GitHub Actions → GitHub Pages |

Architecture decisions are documented in [`docs/sdr/`](docs/sdr/).

---

## Local Development

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Production Build

```bash
npm run build
# Output: dist/
```

## Preview Production Build

```bash
npm run preview
```

---

## GitHub Pages Deployment

The repository uses a GitHub Actions workflow at `.github/workflows/deploy.yml` that:

1. Checks out the repo on every push to `main`
2. Installs Node 20 and runs `npm ci`
3. Runs `npm run build`
4. Uploads `dist/` as a Pages artifact and deploys it

**To enable Pages on a new fork:**

1. Go to **Settings → Pages** in your GitHub repo
2. Set **Source** to **GitHub Actions**
3. Push to `main` — the workflow will build and publish automatically

---

## Features

- ⚔️ **Quest Management** — Create quests with difficulty stars, tags, deadlines, and sub-quests
- 📋 **Quick Templates** — Daily Stand-up, Bug-fix, Code Review, Meeting Prep
- 📈 **XP & Levelling** — Formula: `XP = Base × Difficulty × (1 + streak%) × Deadline pressure`; Level curve: `Fn = 100 × n^1.6`
- 👾 **Procrastination Monsters** — Overdue quests spawn monsters that block Gold earnings until defeated
- 🏆 **Achievements** — First Blood, Streaker, Bug-Bane, Night Coder, Crunch-Slayer, Guild Master
- 💎 **Reward Forge** — Spend Gold & Guild Tokens on cosmetic gear, focus music visualisers, and Time-Freeze potions
- 🧙 **Character Customisation** — Class selection, paper-doll equip slots, and tone preferences
- 🌗 **Light / Dark Mode** — Full token-based theme switching
- 🔌 **Simulation Panel** — Mock Jira sync, Calendar import, PR-merge webhook, time-travel, and data reset

---

## Demo Data & Reset

The app seeds demo data automatically on first load (IndexedDB).  
Use the **Simulation Panel → Reset Demo Data** control to restore defaults at any time.

---

## Requirements

See [`requirements/Questify-requirements.md`](requirements/Questify-requirements.md).
