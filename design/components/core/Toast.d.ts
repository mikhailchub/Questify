import React from "react";
export interface ToastProps {
  title?: string;
  message?: string;
  /** @default "default" */
  tone?: "default" | "success" | "danger" | "info" | "arcane";
  /** Leading icon node. */
  icon?: React.ReactNode;
  onClose?: () => void;
}
/** A single toast card. Stack several in a fixed bottom-right container. */
export function Toast(props: ToastProps): JSX.Element;
