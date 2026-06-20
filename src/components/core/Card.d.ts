import React from "react";
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** @default "default" */
  tone?: "default" | "subtle" | "gold";
  /** Hover lift + pointer. @default false */
  interactive?: boolean;
  /** CSS padding. @default var(--space-5) */
  padding?: string;
}
/** Generic rounded surface container with warm shadow. */
export function Card(props: CardProps): JSX.Element;
