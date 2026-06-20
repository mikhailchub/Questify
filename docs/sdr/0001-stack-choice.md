# SDR-0001: Stack Choice for Questify Web App

## Status
Accepted

## Date
2026-06-20

## Context
- The application requirements specify a Web App (PWA, React-based) with a rich RPG visual aesthetic.
- The project repository contains high-fidelity CSS styling tokens (`design/styles.css` and `design/tokens/`) and pre-built React components (`design/components/**`) that we are mandated to consume and reuse.
- The application needs to be deployed as a static site on GitHub Pages.
- Type safety and solid toolings are key for managing game state computations.

## Decision
We choose **Vite + React + TypeScript** with standard static PWA caching support.
We will copy the design-system files and tokens directly into the app bundle (`src/design-system`) and consume the React primitives in a typed (`.tsx`) format.

## Options considered
- **Option A: Plain HTML, CSS, and Vanilla JS**
  - *Pros:* Zero build steps, simplest possible stack.
  - *Cons:* Extremely hard to compose complex interactive components, manage hierarchical game states, and reuse the provided React components.
- **Option B: Vite + Vanilla JS/TS**
  - *Pros:* Clean build path, no framework overhead.
  - *Cons:* We would have to manually rewrite the provided React components into custom elements or raw DOM manipulators, increasing work and potential layout mismatches.
- **Option C: Vite + React + TypeScript (Chosen)**
  - *Pros:* Directly satisfies the "React-based" PWA requirement, integrates perfectly with the provided React `.jsx` component primitives, and provides strict compiler checks via TypeScript.
  - *Cons:* Requires a build setup (Node.js) and compiling compilation files for deployment.

## Consequences
- The application will require a build step (`npm run build`) which compiles output into `dist/`.
- Developer experience is enhanced by HMR (Hot Module Replacement) and strict TS checks.
- Code reuse of design assets is maximized.
- GitHub Pages must be configured with a GitHub Action that installs Node.js, runs the build step, and deploys the `dist/` directory.

## Requirements touched
- Functional requirements (RPG systems, Quest lists, views)
- UI/UX Requirements (playful RPG aesthetic, light/dark toggling)
- Platforms constraint: "Web app (PWA, React-based)"

## Rejected options and rationale
- **Option A and B** were rejected because the workspace explicitly supplies pre-built React components, and the SRS mandates a React-based web app. Porting these to raw DOM scripts would introduce high risk of divergence from design specifications.
