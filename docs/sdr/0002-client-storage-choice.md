# SDR-0002: Client Storage Choice for Questify

## Status
Accepted

## Date
2026-06-20

## Context
- The SRS requires an "Offline-first architecture (PWA with IndexedDB caching)".
- The application needs to persist multiple entity collections: Quests (with sub-quests and template options), User Avatar state (level, XP, currencies, equipped items), Unlocked Achievements, Unlocked Shop Rewards, Active Monsters, and action logs.
- GitHub Pages restricts data persistence to browser-side local databases. No server-side relational database is available.

## Decision
We choose **IndexedDB** using a native promise-based wrapper (`src/db/questifyDb.ts`). We will define separate object stores for Quests, Avatar State, Purchased Rewards, and Achievements.

## Options considered
- **Option A: In-Memory State Only**
  - *Pros:* Extremely simple to manage.
  - *Cons:* Fails the requirement of persistent RPG progress; refreshing or closing the browser deletes all data.
- **Option B: LocalStorage**
  - *Pros:* Simple synchronous API (`getItem`/`setItem`), easy to implement.
  - *Cons:* Limited storage size (typically 5MB). Relies on serializing and deserializing the entire dataset on every read and write, which causes performance penalties when numbers of quests, logs, and items grow. Fails to meet the "IndexedDB caching" requirement.
- **Option C: IndexedDB (Chosen)**
  - *Pros:* Asynchronous, structured database that supports multiple distinct collections (tables), fast partial updates, virtually unlimited size, and natively matches the offline-first criteria.
  - *Cons:* Asynchronous Promise-based API is slightly more complex than LocalStorage. We will mitigate this with a robust promise helper.

## Consequences
- The application will be robustly offline-first, loading initial state from IndexedDB on startup and flushing state updates asynchronously.
- The UI will render fallback loaders while the initial database handshake is resolving.
- Complete data isolation: clearing browser data will clear progress, so we will support a backup JSON export/import tool.

## Requirements touched
- Functional requirements (Quest management, XP/Level system, Reward Forge, Achievements, Procrastination Monsters)
- Technical constraints (Offline-first architecture, IndexedDB caching)

## Rejected options and rationale
- **Option A** is rejected as it violates standard coursework persistence guidelines.
- **Option B** is rejected because the SRS explicitly requests IndexedDB caching, and managing multiple distinct collections (quests, avatar stats, unlocked cosmetics, achievements) via raw serialized JSON keys in LocalStorage is fragile and scales poorly.
