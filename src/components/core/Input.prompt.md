Labelled text field with optional leading icon, hint, and error state.

```jsx
import { Input } from "../core/Input";

<Input label="Quest title" placeholder="Defeat the inbox" />
<Input label="Search" iconLeft={<Search size={18} />} placeholder="Find a quest" />
<Input label="Deadline" error="Pick a future date" defaultValue="2020-01-01" />
```

Props: `label`, `hint`, `error`, `iconLeft`, `size`. Spreads native input attributes.
