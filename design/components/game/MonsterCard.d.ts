import React from "react";
export interface MonsterCardProps {
  /** @default "Scope-Creep Kraken" */
  name?: string;
  icon?: React.ReactNode;
  /** Number of overdue quests that spawned it. @default 3 */
  overdueCount?: number;
  /** Remaining HP. @default 100 */
  hp?: number;
  hpMax?: number;
  /** Boss battle styling (label + emphasis). @default false */
  boss?: boolean;
  onBattle?: () => void;
}
/** Procrastination Monster card — spawned by overdue quests, blocks Gold until defeated. */
export function MonsterCard(props: MonsterCardProps): JSX.Element;
