import React from "react";
export interface AchievementBadgeProps {
  title: string;
  description?: string;
  /** Icon node (e.g. a Lucide icon). */
  icon?: React.ReactNode;
  /** Rarity ring color. @default "common" */
  rarity?: "common" | "rare" | "epic" | "legendary";
  /** Locked badges render greyscale with a padlock. @default true */
  unlocked?: boolean;
  /** Medal diameter in px. @default 64 */
  size?: number;
}
/** Achievement medal with rarity ring, icon, and locked/unlocked state. */
export function AchievementBadge(props: AchievementBadgeProps): JSX.Element;
