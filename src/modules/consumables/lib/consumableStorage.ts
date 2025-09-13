import type { Consumable } from "@/modules/consumables/schemas";

const KEY = "consumables";

export const loadFromStorage = (): Consumable[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    return JSON.parse(raw).map((c: any) => ({
      ...c,
      lastMovement: c.lastMovement ? new Date(c.lastMovement) : undefined,
    }));
  } catch {
    return [];
  }
};

export const saveToStorage = (data: Consumable[]) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};
