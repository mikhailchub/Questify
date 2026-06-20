export interface CurrencyPillProps {
  amount: number;
  /** @default "gold" */
  type?: "gold" | "token";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}
/** Currency counter chip for Gold (⚔) and Guild Tokens (🎟) with a minted coin glyph. */
export function CurrencyPill(props: CurrencyPillProps): JSX.Element;
