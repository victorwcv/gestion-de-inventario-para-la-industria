import { z } from "zod";

export const machineSchema = z.object({
  id: z.string(),
  internalCode: z.string().min(3),
  name: z.string().min(3),
  brand: z.string().optional(),
  model: z.string().optional(),
  cycleDays: z.number().int().min(1),
  lastMaintenance: z.date().optional(),
  nextMaintenance: z.date().optional(),
  location: z.string().optional(),
});

export type Machine = z.infer<typeof machineSchema>;