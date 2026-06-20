Soft pill tag for quest categories and filters. Pass `onRemove` to make it dismissible.

```jsx
import { Tag } from "../core/Tag";

<Tag color="gold">#bug</Tag>
<Tag color="blue">#meeting</Tag>
<Tag color="ember" onRemove={() => drop("urgent")}>#urgent</Tag>
```

Colors: neutral, gold, ember, green, blue, arcane.
