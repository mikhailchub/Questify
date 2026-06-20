Icon-only square button for toolbars, card corners, and nav rails. Always pass an accessible `label`.

```jsx
import { IconButton } from "../core/IconButton";

<IconButton label="More" variant="ghost"><MoreHorizontal size={20} /></IconButton>
<IconButton label="Add quest" variant="solid" rounded="pill"><Plus size={20} /></IconButton>
```

Variants: `ghost`, `solid`, `outline`. Sizes 36/44/52. `rounded`: md | lg | pill.
