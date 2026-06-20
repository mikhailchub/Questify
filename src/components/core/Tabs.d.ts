import React from "react";
export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}
export interface TabsProps {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
}
/** Segmented control / tab bar with optional icons and counts. */
export function Tabs(props: TabsProps): JSX.Element;
