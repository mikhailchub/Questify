export interface QuestCardProps {
  title: string;
  /** Tag strings (rendered with a leading #). */
  tags?: string[];
  /** Difficulty 1–3. @default 1 */
  difficulty?: 1 | 2 | 3;
  /** XP reward shown on the right. */
  xp?: number;
  /** Deadline label, e.g. "Today 5pm". */
  due?: string;
  /** Completed state — strikes through + dims. @default false */
  done?: boolean;
  /** Overdue — ember border + ember deadline. @default false */
  overdue?: boolean;
  onToggle?: (done: boolean) => void;
}
/**
 * The core quest list item. Completion tick, title, difficulty stars, tags,
 * deadline, and XP reward — the workhorse of the dashboard.
 *
 * @startingPoint section="Game" subtitle="Quest list row with tick, difficulty, XP" viewport="700x110"
 */
export function QuestCard(props: QuestCardProps): JSX.Element;
