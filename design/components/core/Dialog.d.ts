import React from "react";
export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** Action row pinned to the bottom (e.g. Cancel / Confirm buttons). */
  footer?: React.ReactNode;
  /** Max width in px. @default 460 */
  width?: number;
}
/** Centered modal with scrim, spring pop-in, and optional footer actions. */
export function Dialog(props: DialogProps): JSX.Element;
