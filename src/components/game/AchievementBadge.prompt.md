Achievement medal with a rarity ring. Legendary gets a gold glow; locked badges go greyscale with a padlock.

```jsx
import { AchievementBadge } from "../game/AchievementBadge";

<AchievementBadge title="First Blood" description="Complete 1 quest" rarity="common" icon={<Swords size={28} />} />
<AchievementBadge title="Crunch-Slayer" description="Defeat a Boss" rarity="legendary" unlocked={false} icon={<Skull size={28} />} />
```

Rarities: common, rare, epic, legendary.
