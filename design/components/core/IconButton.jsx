import React from "react";

/** Square icon-only button. Pass a single icon node as children. */
export function IconButton({
  children,
  variant = "ghost",
  size = "md",
  rounded = "md",
  disabled = false,
  label,
  onClick,
  style,
  ...rest
}) {
  const dims = { sm: 36, md: 44, lg: 52 };
  const d = dims[size] || dims.md;
  const variants = {
    ghost: { bg: "transparent", fg: "var(--text-body)", border: "transparent", hover: "var(--surface-hover)" },
    solid: { bg: "var(--primary)", fg: "var(--on-primary)", border: "transparent", hover: "var(--primary-hover)" },
    outline: { bg: "var(--surface-raised)", fg: "var(--text-strong)", border: "var(--border-strong)", hover: "var(--surface-hover)" },
  };
  const v = variants[variant] || variants.ghost;
  const radii = { md: "var(--radius-md)", lg: "var(--radius-lg)", pill: "var(--radius-pill)" };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = v.hover; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = v.bg; }}
      style={{
        width: d, height: d,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: v.fg, background: v.bg,
        border: `var(--border-thin) solid ${v.border}`,
        borderRadius: radii[rounded] || radii.md,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background var(--dur-fast)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
