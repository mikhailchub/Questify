# **🛡️ Questify – Software Requirements Specification (SRS)**

## **🎯 1\. Introduction**

### **1.1 Purpose**
Questify transforms daily task management into a gamified RPG adventure, boosting productivity and enhancing daily joy for knowledge workers.

### **1.2 Product Goals**
* **\+20%** average tasks completed per user
* **\-15%** average task age (time-to-done)
* **4.5★+** weekly user satisfaction score

### **1.3 Target Audience**
* Primary: Tech professionals aged 20-45 (developers, designers, PMs)
* Secondary: University students and indie creators

### **1.4 Platforms**
* Web app (PWA, React-based)
* Mobile wrappers (iOS & Android via Capacitor/Flutter)

## **🚩 2\. Functional Requirements**

### **2.1 Quest Management**
* **Quest Builder:** Create quests with titles, descriptions, difficulty levels (★☆☆–★★★), tags, deadlines, assignees, sub-quests.
* **Quest Templates:** Starter library (Daily Stand-up, Bug-fix, Code Review, Meeting Prep) and customizable quests.
* **Integration:** Import tasks from external tools (Jira, calendars).

### **2.2 Gamification**
* **Avatar & Class System:**
* Initial classes: Wizard of Workflow, Deadline Dragon-Rider, Kanban Knight.
* Cosmetic gear unlocked every 2–3 avatar levels (head, body, pet).
* **XP & Level System:**
* XP Calculation: Base reward is 44 XP per difficulty unit, with streak and deadline bonuses as defined in section 2.2.2.
* Leveling curve: Cumulative XP thresholds follow `Fn = 100 × n^1.6`, with the starting-level rule and exact boundaries defined in section 2.2.3.
* **Reward Forge:**
* Currencies: ⚔️ Gold and 🎟️ Guild Tokens
* Rewards: Avatar skins, victory SFX packs, focus music loops, "Time-Freeze" Pomodoro boosts.
* **Achievements (Examples):**
* "First Blood" (1st quest completion)
* "Streaker" (7-day streak)
* "Bug-Bane" (50 bug quests)
* "Crunch-Slayer" (defeat a Boss Monster)
* "Night Coder" (complete quest after 2 AM local time)
* **Procrastination Monsters:**
* Overdue tasks spawn monsters (e.g., Scope-Creep Kraken).
* "Boss Battles" triggered by multiple overdue quests.
* Monsters block Gold earnings until defeated; no XP penalty.

### 2.2.1 Economy scope and numeric conventions

The following rules define the current scope for newly created Quest Builder quests, their completion rewards, character levels, and purchases of permanent items for Gold. Where the overview above leaves a value or boundary unspecified, these rules provide the exact behavior.

The user selects difficulty 1 (Easy), 2 (Medium), or 3 (Hard). XP, Gold, Guild Tokens, and streak values are non-negative integers. Calculations use the full intermediate value; `round(x) = floor(x + 0.5)` for non-negative values. A completion uses one captured completion timestamp and the character state immediately before completion.

Imported and demo quests may have explicitly assigned base rewards. Their reward creation rules, undoing completion, calendar-based streak updates and resets, purchases with Guild Tokens, and consumable effects such as Time-Freeze are outside this clarified scope. The streak value is an existing input to reward calculation; these rules do not require a new daily-streak subsystem. Other product features remain described by their existing requirements.

### 2.2.2 Quest XP and deadline bonus

1. When the user creates a quest, the application assigns `questXP = 44 × difficulty`: 44, 88, or 132 XP. Creation does not change the character's XP, Gold, or Guild Tokens. The quest card shows this base XP; completion bonuses are additional.
2. When the user completes an incomplete quest, the application calculates `streakBonus = min(0.05 × streak, 1)`. Each streak day contributes 5%; the maximum bonus is 100%, reached at 20 days. For example, streak 0 gives multiplier 1, streak 7 gives 1.35, and streak 20 or greater gives 2.
3. For a valid deadline, let `h = (deadlineTimestamp − completionTimestamp) / 3,600,000`, using timestamps in milliseconds. If `0 ≤ h ≤ 4`, the deadline multiplier is `2 − h / 4`. Otherwise it is 1. If no valid deadline is available, the multiplier is 1. The application interprets valid deadline instants consistently regardless of display formatting or locale.
4. Exactly four hours before the deadline, the multiplier is 1; two hours before, 1.5; one hour before, 1.75; exactly at the deadline, 2. A quest is overdue only when its deadline is strictly earlier than completion, and an overdue quest receives no deadline bonus.
5. The application calculates `earnedXP = round(questXP × (1 + streakBonus) × deadlineMultiplier)` and adds it to the character's cumulative XP. No intermediate bonus calculation is rounded. For quests in this scope, difficulty is applied once, when determining `questXP`.
6. After completion, the user sees the updated cumulative XP and the awarded XP in the completion feedback in playful or professional notification mode. Revisiting a view or reloading the page does not award the completion again. Undoing and recompleting a quest is outside this scope.

The following completion examples use a newly created Easy quest (`questXP = 44`) and streak 7. The Gold column assumes no active monster.

| Time remaining at completion | Deadline multiplier | Awarded XP | Awarded Gold |
| --- | ---: | ---: | ---: |
| 5 hours | 1 | 59 | 7 |
| Exactly 4 hours | 1 | 59 | 7 |
| Exactly 2 hours | 1.5 | 89 | 11 |
| Exactly 1 hour | 1.75 | 104 | 13 |
| Exactly at the deadline | 2 | 119 | 15 |
| 1 millisecond after the deadline | 1 | 59 | 7 |

For an Easy quest with no deadline bonus, streak 0 awards 44 XP, streak 1 awards 46 XP, and streak 20 or 21 awards 88 XP. Without streak or deadline bonuses, Medium and Hard quests award 88 and 132 XP respectively.

### 2.2.3 Cumulative XP, levels, and Guild Tokens

1. The character starts at level 1 when cumulative XP is 0. Define the cumulative entry threshold as `T(1) = 0` and `T(n) = floor(100 × n^1.6)` for integer levels `n ≥ 2`.
2. The character's level is the largest integer `n ≥ 1` for which `totalXP ≥ T(n)`. Reaching a threshold exactly grants that level. Leveling does not spend or reset cumulative XP.
3. The application displays progress within the current level as `totalXP − T(currentLevel)`, with a progress maximum of `T(currentLevel + 1) − T(currentLevel)`. At a level entry threshold, progress is 0. Progress is never negative.
4. For one completion, the application determines the old and new levels from the old and new cumulative XP. The user receives one Guild Token for each level gained: `levelTokens = newLevel − oldLevel`. A completion that crosses several thresholds grants all corresponding tokens. With no level gain, it grants no level tokens.
5. Achievement rewards are separate: each newly unlocked achievement grants an additional 2 Guild Tokens once. If a completion unlocks achievements as well as levels, the balance increases by the sum of those rewards. A purchase that unlocks an achievement may also grant achievement tokens.
6. The user sees the same current level on the dashboard, character view, and application header. After reloading the page, the user retains cumulative XP, level, and currency balances without receiving level or achievement rewards again.

| Cumulative XP | Current level | XP within level | XP required within level |
| ---: | ---: | ---: | ---: |
| 0 | 1 | 0 | 303 |
| 100 | 1 | 100 | 303 |
| 302 | 1 | 302 | 303 |
| 303 | 2 | 0 | 276 |
| 578 | 2 | 275 | 276 |
| 579 | 3 | 0 | 339 |
| 918 | 4 | 0 | 395 |

For example, a character with 302 cumulative XP who earns 44 XP reaches level 2 with 346 cumulative XP, progress 43 / 276, and gains 1 level token. A character with 280 XP who earns 462 XP reaches level 3 with 742 XP, progress 163 / 339, and gains 2 level tokens. The latter reward is possible for a Hard quest with streak 20 and one hour remaining. These token examples assume no newly unlocked achievements.

### 2.2.4 Gold earned from quest completion

1. When no active monster has positive HP immediately before completion, the user earns `earnedGold = round(earnedXP / 8)`. The calculation uses the actual awarded XP, including bonuses, rather than the quest's base XP.
2. When an active monster has HP greater than 0 immediately before completion, the user earns 0 Gold and still receives the full XP reward. A monster with 0 HP does not block Gold. If the completion itself defeats a monster, that completion still uses the pre-completion blocking state.
3. An active monster blocks new Gold earnings only. The user keeps existing Gold and may spend it in the Reward Forge.
4. After completion, the user sees the updated Gold balance. In playful or professional notification mode, completion feedback reports the earned Gold or explains that Gold earnings were blocked. Reloading the page preserves the balance without repeating the award.

### 2.2.5 Permanent item purchases for Gold

1. The Reward Forge shows each item's name, price, and currency and the user's current Gold and Guild Token balances. The catalog includes Wizard Hat for 100 Gold and Workflow Robes for 120 Gold. These are permanent items.
2. The user may buy an unowned Gold-priced item when `goldBalance ≥ itemPrice`. An exact balance is sufficient. The application subtracts exactly the displayed price and grants ownership of that item once.
3. If `goldBalance < itemPrice`, the application rejects the purchase. The Gold and Guild Token balances and owned items remain unchanged. In playful or professional notification mode, the user receives an insufficient-Gold message. The existing silent mode suppresses toast notifications.
4. A successful Gold purchase does not spend Guild Tokens or change XP or level. Newly unlocked achievements may separately add Guild Tokens as specified in section 2.2.3.
5. After buying a permanent item, the user sees `Owned` in place of its purchase control and cannot buy it again through the normal UI. Buying cosmetic equipment makes it available for equipping; the purchase does not automatically replace currently equipped gear.
6. After navigating away and back or reloading the page, the user retains the purchased item and the resulting balances. The application does not charge again or repeat achievement rewards on navigation or reload.
7. These rules describe completed purchases during normal local operation. Concurrent purchase requests, storage failures, refunds, and consumable effects are outside this clarified scope.

Each example below starts with the named permanent items unowned. Achievement rewards, if any, are accounted for separately.

| Starting Gold | User action | Expected result | Remaining Gold |
| ---: | --- | --- | ---: |
| 99 | Buy Wizard Hat | Rejected; hat remains unowned | 99 |
| 100 | Buy Wizard Hat | Hat becomes Owned | 0 |
| 101 | Buy Wizard Hat | Hat becomes Owned | 1 |
| 220 | Buy Wizard Hat, then Workflow Robes | Both become Owned | 0 |
| 100 | Buy Wizard Hat, then reload | Hat remains Owned; no further charge | 0 |

### **2.3 Notifications**
* **Default Schedule:**
* Morning Digest (08:00 local)
* 30 min before quest deadlines
* Boss Monster alert for 3+ overdue quests
* **Tone:** Default playful/punny; options for "Professional" or silent mode.
* **Customization:** Frequency and channels (push, email, Slack, Teams)

### **2.4 User Journey Example**
* User opens Questify, imports Jira tasks as quests.
* Gains morning streak XP buff, completes tasks, earns XP/Gold.
* Automatic calendar-based quest completions ("Lunch quest").
* Notifications/reminders encourage completion.
* Level-ups unlock avatar customizations; Gold spent in Reward Forge.

## **📱 3\. UI/UX Requirements**

### **3.1 Style & Mood**
* Bright, playful RPG aesthetic combined with sleek productivity interface.
* Inspired by Habitica (RPG elements), Trello (clarity), Duolingo (animations), Slack (copywriting).

### **3.2 Customization**
* Themes: Light/Dark mode
* Unlockable visual themes (pixel-art, watercolor) via Reward Forge.

## **🛡️ 4\. Technical Constraints**
* Offline-first architecture (PWA with IndexedDB caching)
* Task interactions \<200 ms on mid-tier mobile devices
* Data usage \~1 MB/day per user
* OAuth integration (Google, GitHub, Microsoft); Guest profiles allowed without social features
* Internationalization-ready architecture (English initial launch)

## **🔌 5\. External Integrations**
| Service | Functionality |
| ----- | ----- |
| Google/Outlook Calendar | Auto-import events as quests |
| Slack/MS Teams | Notifications, slash commands, quest updates |
| GitHub/GitLab | Auto-quest completion on PR merges |
| Jira/Asana (Phase 2\) | Two-way synchronization |

## **📊 6\. Future Enhancements**
* Multiplayer "Guilds" with shared quests
* Enhanced calendar & task management integrations
* Leaderboards and seasonal events ("Hackathon Season")
* Wearable device integrations
* AI-driven Quest Coach for task breakdown and effort estimation

---

*End of Questify SRS v1.1* 🛡️⚔️✨
