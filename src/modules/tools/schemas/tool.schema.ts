import { z } from "zod";

const loanSchema = z.object({
  area: z.string(),
  userName: z.string(),
  date: z.date(),
  expectedReturn: z.date().optional(),
});

export const toolSchema = z.object({
  id: z.string(),
  code: z.string().min(3),
  name: z.string().min(3),
  brand: z.string().optional(),
  status: z.enum(["available", "loaned", "maintenance", "lost"]),
  currentLoan: loanSchema.optional(),
  location: z.string().optional(),
  observations: z.string().optional(),
});

export type Tool = z.infer<typeof toolSchema>;