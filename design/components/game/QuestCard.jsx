import React from "react";
import { Checkbox } from "../core/Checkbox";
import { Tag } from "../core/Tag";
import { DifficultyStars } from "./DifficultyStars";

/** The core quest list item: completion tick, title, tags, difficulty, XP reward, deadline. */
export function QuestCard({
  title,
  tags = [],
  difficulty = 1,
  xp,
  due,
  done = false,
  overdue = false,
  onToggle,
  style,
}) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: "14px",
      padding: "16px 18px",
      background: "var(--surface-raised)",
      border: `var(--border-thin) solid ${overdue ? "var(--accent)" : "var(--border)"}`,
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-sm)",
      opacity: done ? 0.62 : 1,
      transition: "opacity var(--dur-base), border-color var(--dur-base)",
      ...style,
    }}>
      <div style={{ marginTop: 2 }}>
        <Checkbox checked={done} onChange={onToggle} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: "var(--weight-semibold)", fontSize: "var(--text-lg)",
            color: "var(--text-strong)",
            textDecoration: done ? "line-through" : "none",
            textDecorationColor: "var(--text-muted)",
          }}>{title}</span>
          <DifficultyStars level={difficulty} size={14} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginTop: 10 }}>
          {tags.map((t) => <Tag key={t} color="neutral">#{t}</Tag>)}
          {due && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)",
              color: overdue ? "var(--accent)" : "var(--text-muted)",
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>
              {due}
            </span>
          )}
        </div>
      </div>
      {xp != null && (
        <span style={{
          flex: "none", alignSelf: "center",
          fontFamily: "var(--font-display)", fontWeight: "var(--weight-bold)", fontSize: "var(--text-base)",
          color: "var(--primary)", whiteSpace: "nowrap",
        }}>+{xp} XP</span>
      )}
    </div>
  );
}
