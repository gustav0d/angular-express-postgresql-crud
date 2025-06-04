import { z } from 'zod';
import { AppError } from '../../error/appError.ts';
import Task from '../taskModel.ts';
import { HttpStatusCode } from '../../error/protocols.ts';

export async function toggleIsDoneTaskService(taskId: number, userId: number) {
  const task = await Task.findOne({
    where: { id: taskId, userId },
  });

  if (!task) {
    throw new AppError('Task not found', HttpStatusCode.NOT_FOUND);
  }

  const updatedTask = await task.update({ isDone: !task.dataValues.isDone });

  return updatedTask;
}
