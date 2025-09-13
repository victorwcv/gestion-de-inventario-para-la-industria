import type { Consumable } from "@/modules/consumables/schemas";

export const mockConsumables: Consumable[] = [
  {
    id: "1",
    sku: "CAB-001",
    description: "Cable NYY 3x2.5 mm²",
    unit: "m",
    stock: 120,
    minStock: 20,
    location: "Est-A1",
    lastMovement: new Date(),
  },
  {
    id: "2",
    sku: "CON-001",
    description: "Contactor 25 A",
    unit: "ud",
    stock: 5,
    minStock: 3,
    location: "Est-B2",
  },
];