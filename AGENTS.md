# AGENTS.md

This repository is a starter workspace for building a small web application from **existing markdown requirements** and deploying it to **GitHub Pages**.

## Repository role

The repository is intentionally minimal. It contains:
- a small static starter app;
- a local skill for requirements-driven implementation;
- shared references for architecture and deployment;
- folders for requirements, data, and SDR records.

## Project constitution

Agents working in this repository should follow these rules:

1. **Requirements first**
   - Do not invent the product theme.
   - Do not write requirements from scratch unless the user explicitly asks.
   - Start from the markdown requirements file placed under `requirements/`.

2. **GitHub Pages constraints are real**
   - Treat this as a static-hosted frontend project by default.
   - Flag requirements that need secure server-side logic, secrets, real authentication, real payment handling, email sending, or trusted backend workflows.
   - Never pretend that sensitive data handling is safe in a pure GitHub Pages app.

3. **Architecture must be explicit**
   - Before major coding, document decisions in `docs/sdr/`.
   - At minimum record stack choice, storage choice, and routing/state/data model.

4. **Prefer the simplest viable stack**
   - Prefer plain HTML/CSS/JS first.
   - Then Vite + vanilla JS/TS when a build step clearly helps.
   - Choose React only when the requirements justify it.

5. **Choose storage deliberately**
   - `localStorage` is the default for simple single-user CRUD.
   - `IndexedDB` is preferred for larger or richer local datasets.
   - Repo files such as `.md` and `.json` are for seed/demo data, not runtime persistence.

6. **Demo-first delivery**
   - Include demo data by default.
   - Include a visible `Reset demo data` control by default.
   - Keep failure states visible and testable.

7. **Deployment expectations**
   - Prefer GitHub Pages deployment via GitHub Actions.
   - Keep deployment files in `.github/workflows/`.
   - Update README instructions when changing the stack or deployment model.

## Where to look

- Local skill for agents that inspect `.agent/skills/`:
  - `.agent/skills/requirements-to-github-pages/`
- Root OpenAI-style skill entrypoint:
  - `SKILL.md`
- Shared guidance:
  - `.agent/skills/requirements-to-github-pages/references/storage-and-stack-selection.md`
  - `.agent/skills/requirements-to-github-pages/references/sdr-template.md`
  - `.agent/skills/requirements-to-github-pages/references/github-pages-deployment.md`
- Shared workflow templates:
  - `.agent/skills/requirements-to-github-pages/assets/github-pages-static.yml`
  - `.agent/skills/requirements-to-github-pages/assets/github-pages-node.yml`

## Expected workflow

1. Read the markdown requirements under `requirements/`.
2. Run a feasibility check against GitHub Pages constraints.
3. Create or update SDR files under `docs/sdr/`.
4. Choose stack and storage.
5. Implement the app.
6. Add or update demo data and reset behavior.
7. Update deployment workflow and README.
8. Push changes so GitHub Pages can publish the result.
