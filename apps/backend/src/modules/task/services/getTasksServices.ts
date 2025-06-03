import { AppError } from '../../error/appError.ts';
import { HttpStatusCode } from '../../error/protocols.ts';
import Task from '../taskModel.ts';

export async function getAllTasksService(userId: number) {
  const tasks = await Task.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
  });
  return tasks;
}

export async function getTaskByIdService(taskId: number, userId: number) {
  const task = await Task.findOne({
    where: { id: taskId, userId },
  });

  if (!task) {
    throw new AppError('Task not found', HttpStatusCode.NOT_FOUND);
  }

  return task;
}
