import React from "react";
export interface TagProps {
  children: React.ReactNode;
  /** @default "neutral" */
  color?: "neutral" | "gold" | "ember" | "green" | "blue" | "arcane";
  /** Show an × that calls this handler. */
  onRemove?: () => void;
}
/** Pill-shaped tag for quest categories, labels, filters. */
export function Tag(props: TagProps): JSX.Element;
