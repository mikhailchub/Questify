import React from "react";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message — also turns the border red. Overrides hint. */
  error?: string;
  /** Leading icon node. */
  iconLeft?: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}
/** Single-line text field with label, optional icon, hint and error states. */
export function Input(props: InputProps): JSX.Element;
