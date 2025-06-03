import type { Request, Response } from 'express';
import { HttpStatusCode } from '../error/protocols.ts';
import { AppError } from '../error/appError.ts';
import {
  getAllTasksService,
  getTaskByIdService,
} from './services/getTasksServices.ts';
import { createTaskService } from './services/createTaskService.ts';
import { updateTaskService } from './services/updateTaskService.ts';
import { markTaskAsDoneService } from './services/markTaskAsDoneService.ts';
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

  const { title, description, dueDate } = request.body;

  const task = await createTaskService({
    title,
    description,
    dueDate,
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

  const { title, description, dueDate, isDone } = request.body;

  const task = await updateTaskService(taskId, userId, {
    title,
    description,
    dueDate,
    isDone,
  });

  response.json({
    message: 'Task updated successfully',
    task,
  });
}

export async function markTaskAsDoneController(
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

  const { isDone } = request.body;

  const task = await markTaskAsDoneService(taskId, userId, { isDone });

  response.json({
    message: `Task marked as ${isDone ? 'done' : 'undone'} successfully`,
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
