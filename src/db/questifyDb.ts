import { Quest, AvatarState } from "../types";

const DB_NAME = "QuestifyDB";
const DB_VERSION = 1;

let dbInstance: IDBDatabase | null = null;

export function getDb(): Promise<IDBDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(request.result);
    };

    request.onupgradeneeded = () => {
      const db = request.result;

      // Store for quests
      if (!db.objectStoreNames.contains("quests")) {
        db.createObjectStore("quests", { keyPath: "id" });
      }

      // Store for avatar state
      if (!db.objectStoreNames.contains("avatar")) {
        db.createObjectStore("avatar", { keyPath: "id" });
      }

      // Store for purchased rewards
      if (!db.objectStoreNames.contains("unlocked_rewards")) {
        db.createObjectStore("unlocked_rewards", { keyPath: "id" });
      }

      // Store for unlocked achievements
      if (!db.objectStoreNames.contains("unlocked_achievements")) {
        db.createObjectStore("unlocked_achievements", { keyPath: "id" });
      }
    };
  });
}

export async function getQuests(): Promise<Quest[]> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("quests", "readonly");
    const store = transaction.objectStore("quests");
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function saveQuest(quest: Quest): Promise<void> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("quests", "readwrite");
    const store = transaction.objectStore("quests");
    const request = store.put(quest);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deleteQuest(id: number): Promise<void> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("quests", "readwrite");
    const store = transaction.objectStore("quests");
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getAvatar(): Promise<AvatarState | null> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("avatar", "readonly");
    const store = transaction.objectStore("avatar");
    const request = store.get(1);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

export async function saveAvatar(avatar: AvatarState): Promise<void> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("avatar", "readwrite");
    const store = transaction.objectStore("avatar");
    const request = store.put({ ...avatar, id: 1 });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getPurchasedRewards(): Promise<string[]> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("unlocked_rewards", "readonly");
    const store = transaction.objectStore("unlocked_rewards");
    const request = store.getAll();
    request.onsuccess = () => resolve((request.result || []).map((r: any) => r.id));
    request.onerror = () => reject(request.error);
  });
}

export async function savePurchasedReward(id: string): Promise<void> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("unlocked_rewards", "readwrite");
    const store = transaction.objectStore("unlocked_rewards");
    const request = store.put({ id });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getUnlockedAchievements(): Promise<string[]> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("unlocked_achievements", "readonly");
    const store = transaction.objectStore("unlocked_achievements");
    const request = store.getAll();
    request.onsuccess = () => resolve((request.result || []).map((a: any) => a.id));
    request.onerror = () => reject(request.error);
  });
}

export async function saveUnlockedAchievement(id: string): Promise<void> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("unlocked_achievements", "readwrite");
    const store = transaction.objectStore("unlocked_achievements");
    const request = store.put({ id });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function clearAllData(): Promise<void> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      ["quests", "avatar", "unlocked_rewards", "unlocked_achievements"],
      "readwrite"
    );

    transaction.objectStore("quests").clear();
    transaction.objectStore("avatar").clear();
    transaction.objectStore("unlocked_rewards").clear();
    transaction.objectStore("unlocked_achievements").clear();

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}
