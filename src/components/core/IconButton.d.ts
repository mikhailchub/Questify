import React from "react";
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "ghost" */
  variant?: "ghost" | "solid" | "outline";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** @default "md" */
  rounded?: "md" | "lg" | "pill";
  /** Accessible label — required, used for aria-label + title. */
  label: string;
  disabled?: boolean;
  /** A single icon node. */
  children: React.ReactNode;
}
/** Square icon-only button for toolbars, card actions, nav. Always pass `label`. */
export function IconButton(props: IconButtonProps): JSX.Element;
