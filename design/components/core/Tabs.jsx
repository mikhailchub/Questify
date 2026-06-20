import React from "react";

/** Segmented tab bar. Controlled via `value`/`onChange` or uncontrolled. */
export function Tabs({ tabs = [], value, defaultValue, onChange, style }) {
  const first = defaultValue ?? (tabs[0] && tabs[0].id);
  const [internal, setInternal] = React.useState(first);
  const active = value !== undefined ? value : internal;

  const select = (id) => {
    if (value === undefined) setInternal(id);
    onChange && onChange(id);
  };

  return (
    <div role="tablist" style={{
      display: "inline-flex", gap: "4px", padding: "4px",
      background: "var(--bg-sunken)", borderRadius: "var(--radius-lg)", ...style,
    }}>
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={on}
            onClick={() => select(t.id)}
            style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              height: 36, padding: "0 16px", border: "none",
              fontFamily: "var(--font-display)", fontWeight: "var(--weight-semibold)", fontSize: "var(--text-sm)",
              color: on ? "var(--text-strong)" : "var(--text-muted)",
              background: on ? "var(--surface-raised)" : "transparent",
              boxShadow: on ? "var(--shadow-sm)" : "none",
              borderRadius: "var(--radius-md)", cursor: "pointer",
              transition: "color var(--dur-fast), background var(--dur-fast)",
            }}
          >
            {t.icon}
            {t.label}
            {t.count != null && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: on ? "var(--primary)" : "var(--text-muted)" }}>{t.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
