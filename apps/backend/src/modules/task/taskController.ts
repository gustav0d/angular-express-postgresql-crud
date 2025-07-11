import type { Request, Response } from 'express';
import { HttpStatusCode } from '../error/protocols.ts';
import { AppError } from '../error/appError.ts';
import {
  getAllTasksService,
  getTaskByIdService,
} from './services/getTasksServices.ts';
import { createTaskService } from './services/createTaskService.ts';
import { updateTaskService } from './services/updateTaskService.ts';
import { toggleIsDoneTaskService } from './services/toggleIsDoneTaskService.ts';
import { deleteTaskService } from './services/deleteTaskService.ts';

export async function getAllTasksController(
  request: Request,
  response: Response,
) {
  const userId = request.user?.id;

  if (!userId) {
    throw new AppError('User not authenticated', HttpStatusCode.UNAUTHORIZED);
  }

  const tasks = await getAllTasksService(userId);

  response.json({
    message: 'Tasks retrieved successfully',
    tasks,
  });
}

export async function getTaskByIdController(
  request: Request,
  response: Response,
) {
  const userId = request.user?.id;
  const taskId = parseInt(request.params.id);

  if (!userId) {
    throw new AppError('User not authenticated', HttpStatusCode.UNAUTHORIZED);
  }

  if (isNaN(taskId)) {
    throw new AppError('Invalid task ID', HttpStatusCode.BAD_REQUEST);
  }

  const task = await getTaskByIdService(taskId, userId);

  response.json({
    message: 'Task retrieved successfully',
    task,
  });
}

export async function createTaskController(
  request: Request,
  response: Response,
) {
  const userId = request.user?.id;

  if (!userId) {
    throw new AppError('User not authenticated', HttpStatusCode.UNAUTHORIZED);
  }

  const task = await createTaskService({
    ...request.body,
    userId,
  });

  response.status(HttpStatusCode.CREATED).json({
    message: 'Task created successfully',
    task,
  });
}

export async function updateTaskController(
  request: Request,
  response: Response,
) {
  const userId = request.user?.id;
  const taskId = parseInt(request.params.id);

  if (!userId) {
    throw new AppError('User not authenticated', HttpStatusCode.UNAUTHORIZED);
  }

  if (isNaN(taskId)) {
    throw new AppError('Invalid task ID', HttpStatusCode.BAD_REQUEST);
  }

  const task = await updateTaskService(taskId, userId, request.body);

  response.json({
    message: 'Task updated successfully',
    task,
  });
}

export async function toggleIsDoneTaskController(
  request: Request,
  response: Response,
) {
  const userId = request.user?.id;
  const taskId = parseInt(request.params.id);

  if (!userId) {
    throw new AppError('User not authenticated', HttpStatusCode.UNAUTHORIZED);
  }

  if (isNaN(taskId)) {
    throw new AppError('Invalid task ID', HttpStatusCode.BAD_REQUEST);
  }

  const task = await toggleIsDoneTaskService(taskId, userId);

  response.json({
    message: `Task marked as ${task.dataValues.isDone ? 'done' : 'undone'} successfully`,
    task,
  });
}

export async function deleteTaskController(
  request: Request,
  response: Response,
) {
  const userId = request.user?.id;
  const taskId = parseInt(request.params.id);

  if (!userId) {
    throw new AppError('User not authenticated', HttpStatusCode.UNAUTHORIZED);
  }

  if (isNaN(taskId)) {
    throw new AppError('Invalid task ID', HttpStatusCode.BAD_REQUEST);
  }

  await deleteTaskService(taskId, userId);

  response.json({
    message: 'Task deleted successfully',
  });
}
