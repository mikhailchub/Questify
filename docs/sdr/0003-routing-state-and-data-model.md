# SDR-0003: Routing, State, and Data Model Choice for Questify

## Status
Accepted

## Date
2026-06-20

## Context
- The application displays multiple views: Today's Quests (Dashboard), Achievements, Reward Forge, and Character Customization.
- The interface needs global reactives: XP bar progressions, level-ups, gold coins, and guild tokens.
- Procrastination Monsters are triggered by overdue quests, blocking gold acquisition.
- Achievements check metrics (e.g. 7-day streaks, bugs fixed) which are influenced by quest updates.
- Standard React context is required to avoid prop-drilling.

## Decision
1. **Routing:** Simple state-based tab routing controlled via React state variable (`view`). It maps to:
   - `quests` -> `DashboardView`
   - `achievements` -> `AchievementsView`
   - `forge` -> `RewardForgeView`
   - `character` -> `CharacterView`
2. **State Management:** A custom React Context Provider `src/context/GameContext.tsx` wraps the app, providing:
   - List of loaded quests and active monsters.
   - User profile stats (XP, level, gold, streak, class, equipped head/body/pet).
   - Dynamic math functions: XP calculation (`XP = Base × Difficulty × (1 + streak%) × Deadline pressure`) and Level requirements curve (`Fn = 100 * n^1.6`).
   - Triggering Toast notifications on events.
3. **Data Model Schemas:**
   - **Quests Object Store:**
     ```typescript
     interface Quest {
       id: number;
       title: string;
       description?: string;
       diff: number; // 1 (Easy), 2 (Medium), 3 (Hard)
       tags: string[];
       due: string; // ISO String or "Today 5pm", etc.
       done: boolean;
       xp: number;
       gold: number;
       overdue: boolean;
       createdAt: number;
       completedAt?: number;
     }
     ```
   - **Avatar Object Store:**
     ```typescript
     interface AvatarState {
       level: number;
       xp: number;
       gold: number;
       tokens: number;
       streak: number;
       class: string; // "Wizard of Workflow", "Deadline Dragon-Rider", "Kanban Knight", "Procrastinator Prince"
       equippedHead?: string;
       equippedBody?: string;
       equippedPet?: string;
       lastActiveDate?: string; // YYYY-MM-DD for tracking streaks
     }
     ```
   - **Rewards Object Store (Items purchased/owned):**
     ```typescript
     interface PurchasedReward {
       id: string; // e.g. "skin-pixel-art", "hat-wizard"
       purchasedAt: number;
     }
     ```
   - **Achievements Object Store:**
     ```typescript
     interface UnlockedAchievement {
       id: string;
       unlockedAt: number;
     }
     ```

## Options considered
- **Option A: React Router Dom**
  - *Pros:* Standard URL hash routing.
  - *Cons:* Adds another heavy package dependency, unnecessarily complex for a single-page local utility dashboard.
- **Option B: Redux / Zustand**
  - *Pros:* Centralized state, immutable logs.
  - *Cons:* Overkill for single-user offline CRUD. Increases boilerplate files.
- **Option C: React Context + Tab State (Chosen)**
  - *Pros:* Clean, simple, native to React, and maintains high performance for single-user states.

## Consequences
- Routing will not modify the URL path, which makes routing completely immune to base path asset lookup errors on GitHub Pages.
- Global triggers like toasts and monsters will automatically react to updates in the Context.

## Requirements touched
- All Quest Management, Gamification, and Technical Constraint requirements.
