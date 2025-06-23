import { Router } from 'express';
import { asyncHandler } from '../utils/handlerAsync';
import { getAllTasksHandler } from '../controllers/get-tasks-controller';
import { getTaskByIdHandler } from '../controllers/get-task-controller';
import { createTaskHandler } from '../controllers/create-task-controller';
import { updateTaskHandler } from '../controllers/update-task-controller';
import { deleteTaskHandler } from '../controllers/delete-task-controller';
import { updatePriorityHandler } from '../controllers/update-priority-controller';

const router = Router();

// Asignación de rutas CON el wrapper asyncHandler
router.get('/tasks', asyncHandler(getAllTasksHandler));
router.get('/tasks/:id', asyncHandler(getTaskByIdHandler));
router.post('/task', asyncHandler(createTaskHandler));
router.put('/tasks/:id', asyncHandler(updateTaskHandler));
router.delete('/tasks/:id', asyncHandler(deleteTaskHandler));
router.patch('/tasks/:id/priority', asyncHandler(updatePriorityHandler));

export default router;