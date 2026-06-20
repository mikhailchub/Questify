Procrastination Monster card — appears when quests go overdue and blocks Gold earnings until defeated. Use `boss` for the 3+ overdue Boss Battle.

```jsx
import { MonsterCard } from "../game/MonsterCard";

<MonsterCard name="Scope-Creep Kraken" overdueCount={3} hp={60} icon={<Skull size={28} />} onBattle={fn} boss />
```
