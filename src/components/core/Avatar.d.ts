export interface AvatarProps {
  /** Image URL. Falls back to initials from `name`. */
  src?: string;
  name?: string;
  /** Pixel diameter. @default 48 */
  size?: number;
  /** Show a level chip on the corner. */
  level?: number;
  /** Gold level ring. @default true */
  ring?: boolean;
}
/** Player avatar with gold level ring and corner level chip. */
export function Avatar(props: AvatarProps): JSX.Element;
