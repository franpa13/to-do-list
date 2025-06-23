import { z } from 'zod';

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  dueDate: z.string().datetime().nullable().optional(),
}).strict();

export const updatePrioritySchema = z.object({
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
}).strict();
