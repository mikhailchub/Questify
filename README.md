# KPI 2026 GitHub Pages App Template

Starter repository for small coursework web applications that are implemented from existing markdown requirements and deployed to GitHub Pages.

## Intended use

Use this repository as a template for:
- the teacher's demo application;
- student repositories created after requirements are already written;
- small GitHub Pages projects that must stay within static hosting constraints.

## Suggested workflow

1. Create a new repository from this template.
2. Add the project requirements as markdown under `requirements/`.
3. Invoke the `requirements-to-github-pages` skill inside the new repository.
4. Let the skill:
   - assess feasibility;
   - choose the simplest viable stack;
   - document SDRs;
   - implement the app;
   - add demo data and reset flow;
   - update deployment files.

## Initial repository structure

- `requirements/` - place the markdown requirements here
- `docs/sdr/` - software decision records
- `data/` - seed and demo data if needed
- `.github/workflows/` - GitHub Pages deployment workflow

## Notes

This repository is intentionally minimal. It is not a finished application.
It is a clean starting point for projects that will be generated from existing requirements.
