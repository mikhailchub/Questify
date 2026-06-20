Animated gold XP progress bar with optional current/next level chips. The signature progress indicator across Questify.

```jsx
import { XpBar } from "../game/XpBar";

<XpBar value={640} max={1000} level={14} nextLevel={15} />
<XpBar value={30} max={100} height={10} showValues={false} />
```

The fill animates on `value` change — set value after mount to play the fill-up.
