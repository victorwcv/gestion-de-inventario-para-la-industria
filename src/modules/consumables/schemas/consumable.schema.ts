import { z } from "zod";

export const consumableSchema = z.object({
  id: z.string(),
  sku: z.string().min(3),
  description: z.string().min(3),
  unit: z.enum(["m", "ud", "kg", "L", "rollo"]),
  stock: z.number().int().min(0),
  minStock: z.number().int().min(0),
  location: z.string().optional(),
  lastMovement: z.date().optional(),
});

export type Consumable = z.infer<typeof consumableSchema>;