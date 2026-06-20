# Storage and stack selection

Use this reference after the requirements have been parsed and before coding begins.

## Stack decision ladder

Choose the simplest option that cleanly supports the requirements.

### 1. Plain HTML, CSS, JavaScript or TypeScript
Prefer this when:
- the app has one to three main views
- routing is minimal or optional
- forms are straightforward
- component reuse is limited
- the state model is small and understandable without a framework

Good fit:
- task planner
- habit tracker
- notes app
- simple booking interface

Avoid upgrading the stack unless a specific requirement forces it.

### 2. Vite with vanilla JavaScript or TypeScript
Prefer this when:
- the app still does not need React
- code organization would benefit from modules and a build step
- the app has multiple screens, richer UI state, or more structured assets
- you need an easier path to TypeScript, linting, and a cleaner build pipeline

This is often the best middle ground for coursework examples.

### 3. Vite with React and TypeScript
Choose this only when justified by the requirements.

Signals that React is warranted:
- many reusable interactive components
- nested UI state across multiple views
- complex forms with conditional sections
- repeated derived views of the same data
- UI composition is a major source of complexity

Do not choose React only because it is popular.

## Storage decision ladder

### In-memory state only
Use only for:
- tiny demos
- prototypes
- purely transient interactions

Not acceptable as the main persistence model for CRUD coursework.

### sessionStorage
Use only for:
- temporary filters
- draft form state in a wizard
- a cart or temporary selection within one tab

Do not use as the main data store for the app.

### localStorage
Default choice when:
- the app is single-user
- persistence is local to one browser
- the number of records is modest
- queries are simple
- there are one or two core entity types
- CRUD flows can load and save whole collections without pain

Typical fit:
- tasks
- notes
- habits
- simple expenses
- small booking datasets

### IndexedDB
Choose this when the requirements imply:
- more than one substantial entity type
- many records or frequent updates
- richer filtering or partial updates
- history or event logs
- offline-first expectations
- queued changes
- data that should not be rewritten as one large JSON blob each time

Typical fit:
- inventory with history
- slot booking with many records
- multi-entity planners
- apps with larger demo datasets

## Important constraints

### Repo files are not runtime persistence
Files stored in the repository such as `.json` and `.md` are useful for seed data, documentation, and examples. They are not the main runtime data store for a GitHub Pages app.

Use them like this:
1. bundle `data/seed.json`
2. initialize browser storage on first run
3. expose `Reset demo data`

### External services
If a requirement demands capabilities that pure GitHub Pages cannot provide, say so clearly.

Examples:
- real user accounts
- secure shared data
- trusted server logic
- payment processing
- private write APIs

Only introduce an external backend or SaaS when the user explicitly accepts that dependency.

## Default delivery choices

Unless the user says otherwise:
- include demo data out of the box
- include a clear `Reset demo data` control
- prefer local browser persistence over external services
- prefer simpler stacks over fashionable ones
