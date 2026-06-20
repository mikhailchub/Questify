Modal dialog with scrim and spring entrance. Render with `open` controlled by state; put actions in `footer`.

```jsx
import { Dialog } from "../core/Dialog";
import { Button } from "../core/Button";

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Abandon quest?"
  footer={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>Keep</Button>
    <Button variant="danger" onClick={confirm}>Abandon</Button>
  </>}
>
  You'll lose any streak bonus on this quest.
</Dialog>
```
