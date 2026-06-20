import React from "react";
import { useGame, ACHIEVEMENTS_LIBRARY } from "../context/GameContext";
import { AchievementBadge } from "../components/game/AchievementBadge";
import { Swords, Flame, Bug, Moon, Skull, Shield, Lock } from "lucide-react";

export function AchievementsView() {
  const { quests, avatar, purchasedRewards, unlockedAchievements } = useGame();

  if (!avatar) return null;

  // Compute live progress stats for display on badges
  const completedQuests = quests.filter((q) => q.done);
  const totalCompleted = completedQuests.length;
  const bugsCompleted = completedQuests.filter((q) => q.tags.includes("bug")).length;
  const gearUnlocked = purchasedRewards.length;

  const getIcon = (iconName: string, unlocked: boolean) => {
    const size = 26;
    if (!unlocked) return <Lock size={size} />;
    
    switch (iconName) {
      case "swords": return <Swords size={size} />;
      case "flame": return <Flame size={size} />;
      case "bug": return <Bug size={size} />;
      case "moon": return <Moon size={size} />;
      case "skull": return <Skull size={size} />;
      case "shield": return <Shield size={size} />;
      default: return <Shield size={size} />;
    }
  };

  const getProgressString = (id: string) => {
    switch (id) {
      case "first-blood":
        return totalCompleted >= 1 ? "✓ Unlocked" : `${totalCompleted} / 1 Completed`;
      case "streaker":
        return avatar.streak >= 7 ? "✓ Unlocked" : `${avatar.streak} / 7 Days`;
      case "bug-bane":
        return bugsCompleted >= 5 ? "✓ Unlocked" : `${bugsCompleted} / 5 Bugs`;
      case "night-coder":
        return unlockedAchievements.includes("night-coder") ? "✓ Unlocked" : "Locked (Complete after 2 AM)";
      case "crunch-slayer":
        return unlockedAchievements.includes("crunch-slayer") ? "✓ Unlocked" : "Locked (Defeat a Boss)";
      case "guild-master":
        return gearUnlocked >= 5 ? "✓ Unlocked" : `${gearUnlocked} / 5 Gear Unlocked`;
      default:
        return "";
    }
  };

  const unlockedCount = ACHIEVEMENTS_LIBRARY.filter((a) => unlockedAchievements.includes(a.id)).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      
      {/* Header and status */}
      <div style={{
        padding: "var(--space-4) var(--space-5)",
        background: "var(--surface-raised)",
        border: "var(--border-thin) solid var(--border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)"
      }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", margin: 0, color: "var(--text-strong)" }}>
          🏆 Achievements Log
        </h3>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", margin: "4px 0 0 0" }}>
          You have unlocked <strong style={{ color: "var(--text-strong)" }}>{unlockedCount} of {ACHIEVEMENTS_LIBRARY.length}</strong> accomplishments. Unlocking an achievement awards <strong style={{ color: "var(--gold-600)" }}>2 Guild Tokens</strong>!
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "var(--space-5)"
      }}>
        {ACHIEVEMENTS_LIBRARY.map((a) => {
          const unlocked = unlockedAchievements.includes(a.id);
          const progressStr = getProgressString(a.id);
          
          return (
            <div key={a.id} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "var(--space-4)",
              background: "var(--surface-raised)",
              border: "var(--border-thin) solid var(--border)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-sm)",
              opacity: unlocked ? 1 : 0.72,
              textAlign: "center"
            }}>
              <div style={{ marginBottom: 12 }}>
                <AchievementBadge
                  title={a.title}
                  description={a.desc}
                  rarity={a.rarity as any}
                  unlocked={unlocked}
                  icon={getIcon(a.icon, unlocked)}
                />
              </div>
              
              {/* Progress reading */}
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 600,
                color: unlocked ? "var(--success)" : "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                marginTop: 6
              }}>
                {progressStr}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
