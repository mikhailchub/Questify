export interface CheckboxProps {
  /** Controlled checked state. Omit to use `defaultChecked` (uncontrolled). */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}
/** Checkbox + label. Doubles as the quest-complete tick in lists. */
export function Checkbox(props: CheckboxProps): JSX.Element;
