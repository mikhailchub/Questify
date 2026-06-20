A single toast notification card with a tone stripe. Render in a fixed bottom-right stack; the playful brand voice lives here ("Quest complete! +240 XP").

```jsx
import { Toast } from "../core/Toast";

<Toast tone="success" title="Quest complete!" message="+240 XP · +35 Gold" icon={<Trophy size={20} />} />
<Toast tone="danger" title="Boss incoming" message="3 quests overdue — defeat the Scope-Creep Kraken." />
```
