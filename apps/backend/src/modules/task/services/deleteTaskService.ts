import { Task } from '../taskModel.ts';
import { AppError } from '../../error/appError.ts';
import { HttpStatusCode } from '../../error/protocols.ts';

export async function deleteTaskService(taskId: number, userId: number) {
  const task = await Task.findOne({
    where: { id: taskId, userId },
  });

  if (!task) {
    throw new AppError('Task not found', HttpStatusCode.NOT_FOUND);
  }

  await task.destroy();

  return { success: true };
}
