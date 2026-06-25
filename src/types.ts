export interface Quest {
  id: number;
  title: string;
  description?: string;
  diff: number; // 1 = Easy, 2 = Medium, 3 = Hard
  tags: string[];
  due: string;
  done: boolean;
  xp: number;
  gold: number;
  overdue: boolean;
  createdAt: number;
  completedAt?: number;
}

export interface AvatarState {
  id: number; // always 1 for the local guest profile
  level: number;
  xp: number;
  gold: number;
  tokens: number;
  streak: number;
  class: string; // Wizard of Workflow, Deadline Dragon-Rider, Kanban Knight, Procrastinator Prince
  equippedHead?: string;
  equippedBody?: string;
  equippedPet?: string;
  lastActiveDate?: string; // YYYY-MM-DD for tracking streaks
  tone: "playful" | "professional" | "silent";
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  currency: "gold" | "token";
  type: "head" | "body" | "pet" | "sfx" | "music" | "boost";
  previewValue: string; // e.g. visual gear code, sfx label, focus music visual, etc.
}

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked: boolean;
  progress?: string;
}

export interface ToastMessage {
  id: string;
  tone: "success" | "info" | "error";
  title: string;
  msg: string;
}
