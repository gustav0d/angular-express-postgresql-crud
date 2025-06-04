import { Router } from 'express';
import {
  getAllTasksController,
  getTaskByIdController,
  createTaskController,
  updateTaskController,
  toggleIsDoneTaskController,
  deleteTaskController,
} from './taskController.ts';
import { ensureAuthenticated } from '../auth/middlewares/ensureAuthenticated.ts';

const taskRouter = Router();

taskRouter.use(ensureAuthenticated);

taskRouter.get('/', getAllTasksController);
taskRouter.get('/:id', getTaskByIdController);
taskRouter.post('/', createTaskController);
taskRouter.put('/:id', updateTaskController);
taskRouter.patch('/:id', toggleIsDoneTaskController);
taskRouter.delete('/:id', deleteTaskController);

export { taskRouter };
