import React from "react";
export interface BadgeProps {
  children: React.ReactNode;
  /** @default "neutral" */
  tone?: "neutral" | "gold" | "success" | "danger" | "info";
  /** @default "soft" */
  variant?: "soft" | "solid";
  /** Leading status dot. @default false */
  dot?: boolean;
}
/** Tiny status/count badge — "Overdue", "3", "New", streak status. */
export function Badge(props: BadgeProps): JSX.Element;
