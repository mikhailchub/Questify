export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}
/** Binary on/off toggle for settings (dark mode, notification channels). */
export function Switch(props: SwitchProps): JSX.Element;
