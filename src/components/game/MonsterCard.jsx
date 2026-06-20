import React from "react";

/** Procrastination Monster card — spawned by overdue quests; blocks Gold until defeated. */
export function MonsterCard({ name = "Scope-Creep Kraken", icon = null, overdueCount = 3, hp = 100, hpMax = 100, onBattle, boss = false, style }) {
  const pct = Math.max(0, Math.min(100, (hp / hpMax) * 100));
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "16px",
      padding: "18px 20px",
      background: "var(--monster-soft)",
      border: `var(--border-thick) solid var(--monster)`,
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-md)",
      ...style,
    }}>
      <div style={{
        width: 56, height: 56, flex: "none", borderRadius: "var(--radius-md)",
        background: "var(--monster)", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {boss && (
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: "var(--monster)", padding: "2px 7px", borderRadius: "var(--radius-pill)" }}>Boss</span>
          )}
          <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-semibold)", fontSize: "var(--text-lg)", color: "var(--ember-700)" }}>{name}</span>
        </div>
        <div style={{ fontSize: "var(--text-xs)", color: "var(--ember-700)", opacity: 0.85, marginTop: 1 }}>
          Spawned by {overdueCount} overdue {overdueCount === 1 ? "quest" : "quests"} · blocking Gold
        </div>
        <div style={{ marginTop: 9, height: 8, background: "color-mix(in oklab, var(--monster) 22%, transparent)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "var(--monster)", borderRadius: "var(--radius-pill)", transition: "width var(--dur-slow) var(--ease-out)" }} />
        </div>
      </div>
      {onBattle && (
        <button onClick={onBattle} style={{
          flex: "none", height: "var(--control-md)", padding: "0 18px", border: "none",
          background: "var(--monster)", color: "#fff",
          fontFamily: "var(--font-display)", fontWeight: "var(--weight-semibold)", fontSize: "var(--text-base)",
          borderRadius: "var(--radius-lg)", boxShadow: "0 4px 0 var(--ember-700)", cursor: "pointer",
        }}>Battle</button>
      )}
    </div>
  );
}
