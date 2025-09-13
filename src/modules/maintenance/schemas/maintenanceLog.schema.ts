import { z } from "zod";

export const maintenanceLogSchema = z.object({
  id: z.string(),
  machineId: z.string(),
  type: z.enum(["preventive", "corrective"]),
  date: z.date(),
  description: z.string(),
  technician: z.string(),
  nextDue: z.date().optional(),
  files: z.array(z.string()).optional(),
});

export type MaintenanceLog = z.infer<typeof maintenanceLogSchema>;