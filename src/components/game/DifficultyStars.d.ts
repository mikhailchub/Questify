export interface DifficultyStarsProps {
  /** Filled stars, 1–3. @default 1 */
  level?: 1 | 2 | 3;
  /** @default 3 */
  max?: number;
  /** Star size in px. @default 16 */
  size?: number;
  /** Show "Easy/Medium/Hard" label. @default false */
  showLabel?: boolean;
}
/** Quest difficulty rating shown as gold stars (★☆☆–★★★). */
export function DifficultyStars(props: DifficultyStarsProps): JSX.Element;
