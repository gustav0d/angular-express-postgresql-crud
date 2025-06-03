import { z } from 'zod';
import { AppError } from '../../error/appError.ts';
import { HttpStatusCode } from '../../error/protocols.ts';
import Task from '../taskModel.ts';

const updateTaskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }).optional(),
  description: z.string().optional(),
  dueDate: z
    .string()
    .optional()
    .transform((dateVal) => (dateVal ? new Date(dateVal) : undefined)),
  isDone: z.boolean().optional(),
});
type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export async function updateTaskService(
  taskId: number,
  userId: number,
  taskData: UpdateTaskInput,
) {
  const validate = updateTaskSchema.safeParse(taskData);

  if (!validate.success) {
    throw new AppError(validate.error);
  }

  const task = await Task.findOne({
    where: { id: taskId, userId },
  });

  if (!task) {
    throw new AppError('Task not found', HttpStatusCode.NOT_FOUND);
  }

  const validatedData = validate.data;
  await task.update(validatedData);

  return task;
}
