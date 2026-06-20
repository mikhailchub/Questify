Segmented tab bar for filtering views (Today / Upcoming / Done). Pass `tabs` with optional icon + count.

```jsx
import { Tabs } from "../core/Tabs";

<Tabs
  tabs={[
    { id: "today", label: "Today", count: 4 },
    { id: "upcoming", label: "Upcoming", count: 11 },
    { id: "done", label: "Done" },
  ]}
  value={tab}
  onChange={setTab}
/>
```
