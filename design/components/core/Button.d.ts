import React from "react";

export type ButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Brand role. @default "primary" */
  variant?: ButtonVariant;
  /** @default "md" */
  size?: ButtonSize;
  /** Chunky 3D bottom edge that flattens on press. Reserve for the single
   *  most important action on a view. @default false */
  pop?: boolean;
  /** Fill the container width. @default false */
  block?: boolean;
  disabled?: boolean;
  /** Icon node rendered before the label (e.g. a Lucide <Sword size={18}/>). */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * The primary action control. Use `variant="primary"` + `pop` for the hero
 * CTA on a screen ("Start quest", "Claim reward"); `secondary` for neutral
 * actions; `ghost` for low-emphasis; `danger` for destructive.
 *
 * @startingPoint section="Core" subtitle="Branded action button with 3D pop variant" viewport="700x160"
 */
export function Button(props: ButtonProps): JSX.Element;
