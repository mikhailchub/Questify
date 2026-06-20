import React, { useState } from "react";
import { useGame, getXpRequiredForLevel, calculateLevelFromXp } from "../context/GameContext";
import { QuestCard } from "../components/game/QuestCard";
import { XpBar } from "../components/game/XpBar";
import { MonsterCard } from "../components/game/MonsterCard";
import { Button } from "../components/core/Button";
import { Swords, Skull, Plus, Flame, Clock } from "lucide-react";

export function DashboardView() {
  const {
    quests,
    avatar,
    activeMonster,
    toggleQuest,
    deleteQuest,
    addQuest,
    dealMonsterDamage,
  } = useGame();

  const [tab, setTab] = useState<"today" | "done">("today");
  const [battleLog, setBattleLog] = useState<string | null>(null);

  if (!avatar) return null;

  // Calculate XP details using engine formulas
  const { level, xpInLevel, xpMaxForLevel } = calculateLevelFromXp(avatar.xp);

  // Filter quests
  const activeQuests = quests.filter((q) => !q.done);
  const doneQuests = quests.filter((q) => q.done);
  const displayedQuests = tab === "today" ? activeQuests : doneQuests;

  const handleTemplateAdd = (templateName: string, diff: number, tags: string[]) => {
    // Due 5pm today
    const now = new Date();
    const targetDue = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0);
    addQuest(templateName, diff, tags, "Today 5pm", targetDue.getTime());
  };

  const handleBattleClick = () => {
    if (!activeMonster) return;
    
    // Choose random attack phrase based on class
    const attacks = avatar.class === "Wizard of Workflow"
      ? ["casts Kanban Fireball!", "summons a Sprint Storm!", "brews a Refactoring Potion!"]
      : avatar.class === "Deadline Dragon-Rider"
      ? ["commands dragon fire!", "charges with critical path spear!", "soars over blockers!"]
      : ["slashes with Stand-up Sword!", "deflects with Kanban Shield!", "charges forward!"];

    const chosenAttack = attacks[Math.floor(Math.random() * attacks.length)];
    const damage = Math.floor(Math.random() * 20) + 15; // 15-35 DMG
    
    dealMonsterDamage(damage);
    
    const targetHp = Math.max(0, activeMonster.hp - damage);
    if (targetHp <= 0) {
      setBattleLog(`⚔️ ${avatar.class} ${chosenAttack} dealing ${damage} DMG! 💥 Monster SLAYED!`);
    } else {
      setBattleLog(`⚔️ ${avatar.class} ${chosenAttack} dealing ${damage} DMG! (Monster HP: ${targetHp}/${activeMonster.hpMax})`);
    }

    setTimeout(() => {
      setBattleLog(null);
    }, 3000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      
      {/* XP Banner card */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-6)",
        padding: "var(--space-6)",
        background: "linear-gradient(120deg, var(--surface-raised), var(--primary-soft))",
        border: "var(--border-thin) solid var(--border)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-sm)"
      }}>
        {/* Level Emblem */}
        <span style={{
          width: 64, height: 64, flex: "none",
          borderRadius: "50%", border: "4px solid var(--primary)",
          background: "var(--surface-raised)", color: "var(--gold-700)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26,
          boxSizing: "border-box"
        }}>
          {level}
        </span>
        
        {/* XP Track */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-semibold)", fontSize: "var(--text-xl)", color: "var(--text-strong)" }}>
              {avatar.class}
            </span>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Total XP: {avatar.xp.toLocaleString()}
            </span>
          </div>
          
          <div style={{ marginTop: 8 }}>
            <XpBar value={xpInLevel} max={xpMaxForLevel} />
          </div>
        </div>
        
        <div style={{ textAlign: "right", flex: "none" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>NEXT</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "var(--text-strong)" }}>
            Lv {level + 1}
          </div>
        </div>
      </div>

      {/* Procrastination Monster panel */}
      {activeMonster && activeMonster.hp > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <MonsterCard
            name={activeMonster.name}
            icon={<Skull size={30} />}
            overdueCount={activeMonster.overdueCount}
            hp={activeMonster.hp}
            hpMax={activeMonster.hpMax}
            boss={activeMonster.type === "boss"}
            onBattle={handleBattleClick}
          />
          {battleLog && (
            <div style={{
              padding: "var(--space-2) var(--space-4)",
              background: "var(--monster-soft)",
              borderRadius: "var(--radius-md)",
              color: "var(--ember-700)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              fontFamily: "var(--font-mono)",
              border: "1px solid var(--monster)",
              textAlign: "center",
              animation: "qf-slide-in 0.2s ease"
            }}>
              {battleLog}
            </div>
          )}
        </div>
      )}

      {/* Quest Templates segment */}
      <div style={{
        padding: "var(--space-4)",
        background: "var(--surface-raised)",
        border: "var(--border-thin) solid var(--border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)"
      }}>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)", margin: "0 0 12px 0" }}>
          ⚔️ Quick side-quest templates
        </h4>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Button variant="secondary" size="sm" onClick={() => handleTemplateAdd("Daily Stand-up", 1, ["daily"])}>
            <Plus size={14} /> Daily Stand-up
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleTemplateAdd("Fix the critical bug", 2, ["bug"])}>
            <Plus size={14} /> Bug-fix
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleTemplateAdd("Review peer code changes", 2, ["code", "review"])}>
            <Plus size={14} /> Code Review
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleTemplateAdd("Draft Roadmap slides", 3, ["planning"])}>
            <Plus size={14} /> Meeting Prep
          </Button>
        </div>
      </div>

      {/* Tabs selectors */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "inline-flex", gap: 4, padding: 4, background: "var(--bg-sunken)", borderRadius: "var(--radius-lg)" }}>
          <button
            onClick={() => setTab("today")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7, height: 36, padding: "0 16px", border: "none",
              fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14,
              color: tab === "today" ? "var(--text-strong)" : "var(--text-muted)",
              background: tab === "today" ? "var(--surface-raised)" : "transparent",
              boxShadow: tab === "today" ? "var(--shadow-sm)" : "none",
              borderRadius: "var(--radius-md)", cursor: "pointer"
            }}
          >
            Today <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: tab === "today" ? "var(--primary)" : "var(--text-muted)" }}>{activeQuests.length}</span>
          </button>
          
          <button
            onClick={() => setTab("done")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7, height: 36, padding: "0 16px", border: "none",
              fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14,
              color: tab === "done" ? "var(--text-strong)" : "var(--text-muted)",
              background: tab === "done" ? "var(--surface-raised)" : "transparent",
              boxShadow: tab === "done" ? "var(--shadow-sm)" : "none",
              borderRadius: "var(--radius-md)", cursor: "pointer"
            }}
          >
            Done <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: tab === "done" ? "var(--primary)" : "var(--text-muted)" }}>{doneQuests.length}</span>
          </button>
        </div>
      </div>

      {/* Quest log cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {displayedQuests.map((q) => (
          <div key={q.id} style={{ position: "relative", group: "true" } as any}>
            <QuestCard
              title={q.title}
              tags={q.tags}
              difficulty={q.diff as 1 | 2 | 3}
              xp={q.xp}
              due={q.due}
              done={q.done}
              overdue={q.overdue || (!q.done && new Date(q.due).getTime() < Date.now())}
              onToggle={() => toggleQuest(q.id)}
            />
            {/* Trash button positioned absolute on hover */}
            <button
              onClick={() => deleteQuest(q.id)}
              title="Delete Quest"
              style={{
                position: "absolute", right: 8, bottom: 8,
                background: "transparent", border: "none",
                color: "var(--text-muted)", cursor: "pointer",
                padding: 4, borderRadius: "var(--radius-sm)"
              }}
            >
              ×
            </button>
          </div>
        ))}
        {displayedQuests.length === 0 && (
          <div style={{
            padding: 48, textAlign: "center",
            background: "var(--surface-raised)", border: "var(--border-thin) dashed var(--border)",
            borderRadius: "var(--radius-lg)", color: "var(--text-muted)",
            fontSize: 15
          }}>
            {tab === "today"
              ? "All quests completed! Slayed the backlog. ⚔️"
              : "No completed quests recorded today. Fight on!"
            }
          </div>
        )}
      </div>

    </div>
  );
}
