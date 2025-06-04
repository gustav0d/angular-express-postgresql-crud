import { z } from 'zod';
import { AppError } from '../../error/appError.ts';
import Task from '../taskModel.ts';

const createTaskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  dueDate: z
    .string()
    .optional()
    .transform((dateVal) => (dateVal ? new Date(dateVal) : undefined)),
  userId: z.number(),
});

type CreateTaskInput = z.infer<typeof createTaskSchema>;

export async function createTaskService(taskData: CreateTaskInput) {
  const validatedData = createTaskSchema.parse(taskData);

  const task = await Task.create(validatedData);

  return task;
}
