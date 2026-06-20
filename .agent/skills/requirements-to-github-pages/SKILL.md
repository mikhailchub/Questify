---
name: requirements-to-github-pages
description: implement small web applications from existing markdown requirements and deploy them to github pages. use when the user already has written requirements for a web app and wants feasibility analysis against github pages constraints, architecture decisions documented as sdr records, storage selection such as localstorage vs indexeddb, implementation in an existing repository, repository updates, github actions setup, or pages deployment.
---

# Requirements To Github Pages

## Overview

Read an existing markdown requirements document, assess what can and cannot be delivered as a GitHub Pages app, choose the simplest viable architecture, document major technical decisions as SDR records, implement the app, add demo data and a reset control by default, update the repository, and publish through GitHub Pages.

Do not invent a theme or write requirements from scratch. Do not silently rewrite requirements. Flag infeasible or risky items first.

## Required input

The skill expects:
- a markdown file containing the requirements
- an existing repository working tree
- optional constraints such as preferred stack, forbidden libraries, naming rules, or deadline
- optionally an existing app to update instead of building from scratch

If the requirements file is missing, stop and ask for it. Do not bootstrap from a vague idea.

## Workflow

Follow this sequence:

1. Parse the requirements
2. Run a GitHub Pages feasibility pass
3. Produce architecture decisions and SDR records before coding
4. Choose the stack and persistence model
5. Implement the app, demo data, and reset flow
6. Add Pages deployment files and repository updates
7. Verify locally when possible
8. Push changes and enable or update Pages when tooling and auth are available
9. Finish with a structured implementation report

## 1. Parse the requirements

Extract and list:
- functional requirements
- non-functional requirements
- entities and fields
- user flows
- forms and validations
- business rules
- persistence expectations
- state transitions
- deployment or technology constraints

Preserve traceability from requirement to implementation. Keep a compact mapping in `README.md` or `docs/implementation-notes.md`.

## 2. Feasibility pass

Classify each important requirement as one of:
- **directly deliverable on GitHub Pages**
- **deliverable with a client-side compromise**
- **not appropriate for pure GitHub Pages without an external backend or service**

Flag requirements that imply:
- secret storage
- server-side authentication or authorization
- multi-user consistency or conflict resolution
- sensitive transactions
- server-owned files or databases
- trusted clocks or secure scheduled jobs
- secure coupon, loyalty, or payment logic
- email sending or other backend-triggered integrations

When a requirement is risky or infeasible, warn before coding and propose the smallest acceptable technical alternative. Example: replace real accounts with local browser profiles.

Do not rewrite the requirements document unless the user explicitly asks. If you must compromise in implementation, document that as an implementation compromise, not as a changed requirement.

## 3. Architecture and SDRs

Before coding, create `docs/sdr/` and add at minimum:
- `0001-stack-choice.md`
- `0002-client-storage-choice.md`
- `0003-routing-state-and-data-model.md`

Add more SDRs when justified, for example for search and filtering, offline behavior, import and export, deployment, or testing strategy.

Use `.agent/skills/requirements-to-github-pages/references/sdr-template.md`.

Each SDR should include:
- context
- decision
- options considered
- consequences
- requirements touched
- rejected options and why

## 4. Stack selection rules

Default to the simplest stack that cleanly satisfies the requirements.

Prefer, in order:
1. plain HTML, CSS, and JavaScript or TypeScript without a framework
2. Vite with vanilla JavaScript or TypeScript
3. Vite with React and TypeScript

Choose React only when the requirements justify it through component complexity, repeated UI composition, multi-view state, or complex forms. Do not choose React just because it is familiar.

Prefer minimal dependencies. Add a CSS framework only if it clearly improves delivery speed or readability.

Read `.agent/skills/requirements-to-github-pages/references/storage-and-stack-selection.md` before making the decision and document the choice in an SDR.

## 5. Storage selection rules

Apply these defaults:
- in-memory state only: acceptable for demos or ephemeral flows, but not as the primary persistence model for a CRUD app
- `sessionStorage`: temporary carts, wizards, or drafts within a tab; not the main store for coursework CRUD
- `localStorage`: the default for single-user apps with modest record counts, simple filters and sorts, and one or two core entities
- `IndexedDB`: choose when the requirements imply larger datasets, multiple related entities, richer queries, history, queues, offline-first behavior, or frequent partial updates
- repo files such as `.json` and `.md`: seed or demo data only, not runtime persistence
- external backend or service: only when the requirements explicitly demand capabilities GitHub Pages cannot provide and the user accepts that trade-off

Always justify the storage choice in `0002-client-storage-choice.md`.

By default, provide:
- seed or demo data bundled with the app
- one obvious `Reset demo data` control
- optional import and export only when it materially helps testing or recovery

## 6. Implementation rules

Implement from the requirements, not from taste.

- Build forms and validations directly from the requirements
- Model business rules explicitly in code, not only in UI text
- Make failure states visible and testable
- Avoid magic data; demo data should exercise common and boundary scenarios
- Include accessible labels, empty states, and visible feedback after create, update, and delete operations
- Do not store secrets in frontend code or repository files
- Do not represent local-only browser data as true multi-user persistence

## 7. Repository expectations

Assume the repository already exists and this skill is operating inside it.

Unless the user specifies otherwise:
- keep application source in the repo root for plain static apps, or use the standard Vite layout for built apps
- place SDRs under `docs/sdr/`
- place demo or seed data under `data/` when that improves readability
- add or update `README.md` with run, build, and deploy notes
- add `.github/workflows/` for Pages deployment when needed

Do not rename the repository. Do not require the skill to create the repository.

## 8. GitHub Pages deployment

Prefer GitHub Pages deployment through a custom GitHub Actions workflow. Read `.agent/skills/requirements-to-github-pages/references/github-pages-deployment.md` and use one of the templates in `.agent/skills/requirements-to-github-pages/assets/`.

Choose the template that matches the implementation:
- `.agent/skills/requirements-to-github-pages/assets/github-pages-static.yml` for plain static apps with no build step
- `.agent/skills/requirements-to-github-pages/assets/github-pages-node.yml` for build-based apps such as Vite

If using Vite on a project Pages site, set the correct base path for the repository or otherwise generate relative asset paths so deployed assets resolve correctly.

When GitHub auth or tooling is available:
- update repo files
- make coherent commits
- push to the target branch
- enable or update Pages so the Actions workflow publishes the site

When auth or tooling is unavailable:
- still create the workflow file and all code locally
- explain exactly what must be pushed or enabled manually

## 9. Verification

Before finishing:
- run the local dev or preview flow when possible
- test create, read, update, and delete for the main entity flows
- test demo data initialization and reset
- confirm routing and asset paths work for GitHub Pages deployment mode
- verify that any infeasible requirement is not silently half-implemented

## 10. Completion report

Always finish with a short structured report containing:
- feasibility summary
- chosen stack
- chosen persistence model
- SDR files created
- demo data and reset behavior added
- requirements fully implemented
- requirements simplified or deferred
- deployment status and site URL if available

## Guardrails

- Do not invent product requirements
- Do not quietly weaken validation or business rules to make implementation easier
- Do not claim secure authentication, payments, or sensitive data handling on pure GitHub Pages
- Do not choose IndexedDB or React without saying why
- Do not remove demo data or reset capability unless the user explicitly asks
- Do not overwrite an existing architecture without first checking whether the repository already has conventions worth preserving
