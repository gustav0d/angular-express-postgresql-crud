import { z } from 'zod';
import { AppError } from '../../error/appError.ts';
import Task from '../taskModel.ts';
import { HttpStatusCode } from '../../error/protocols.ts';

const markAsDoneSchema = z.object({
  isDone: z.boolean(),
});

type MarkAsDoneInput = z.infer<typeof markAsDoneSchema>;

export async function markTaskAsDoneService(
  taskId: number,
  userId: number,
  data: MarkAsDoneInput,
) {
  const validate = markAsDoneSchema.safeParse(data);

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
  await task.update({ isDone: validatedData.isDone });

  return task;
}
