Branded action button — use for any clickable action; `pop` gives the chunky 3D quest-button feel for the single hero CTA on a view.

```jsx
import { Button } from "../core/Button";

<Button variant="primary" pop iconLeft={<Sword size={18} />}>Start quest</Button>
<Button variant="secondary">Save draft</Button>
<Button variant="ghost" size="sm">Cancel</Button>
<Button variant="danger">Abandon</Button>
```

Variants: `primary` (gold), `accent` (ember), `secondary` (outline), `ghost`, `danger`.
Sizes: `sm` (36px), `md` (44px), `lg` (52px). Props: `pop`, `block`, `disabled`, `iconLeft`, `iconRight`.
Use at most one `pop` primary per view. Pair with Lucide icons for `iconLeft`/`iconRight`.
