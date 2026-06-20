The core quest list item — tick to complete, title, difficulty stars, tags, deadline, XP reward. Composes Checkbox, Tag, and DifficultyStars.

```jsx
import { QuestCard } from "../game/QuestCard";

<QuestCard title="Review the PR" tags={["code", "review"]} difficulty={2} xp={120} due="Today 5pm" onToggle={fn} />
<QuestCard title="Ship the changelog" difficulty={3} xp={300} due="Yesterday" overdue onToggle={fn} />
<QuestCard title="Stand-up" xp={40} done onToggle={fn} />
```
