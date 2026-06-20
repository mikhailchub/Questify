export interface XpBarProps {
  /** Current XP toward the next level. */
  value: number;
  /** XP needed for next level. @default 100 */
  max?: number;
  /** Current level chip on the left. */
  level?: number;
  /** Next level chip on the right. */
  nextLevel?: number;
  /** Bar thickness in px. @default 14 */
  height?: number;
  /** Show "value / max XP" readout. @default true */
  showValues?: boolean;
}
/** Animated gold XP progress bar with level chips. */
export function XpBar(props: XpBarProps): JSX.Element;
