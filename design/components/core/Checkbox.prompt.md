Checkbox with label. Controlled (`checked` + `onChange`) or uncontrolled (`defaultChecked`). Also used as the round-tick quest completion toggle.

```jsx
import { Checkbox } from "../core/Checkbox";

<Checkbox label="Write the spec" defaultChecked />
<Checkbox label="Review PR" checked={done} onChange={setDone} />
```
