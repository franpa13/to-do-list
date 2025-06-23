import { Router } from 'express';
import { AsyncRouteHandler, Priorities } from '../types/task-types';
import { asyncHandler } from '../utils/handlerAsync';
import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskPriority
} from '../models/task-model';
import { updatePrioritySchema, updateTaskSchema } from '../schemas/task-schema';

const router = Router();

// CREATE - Handler para crear tarea
const createTaskHandler: AsyncRouteHandler = async (req, res) => {
    const { title,  dueDate } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    const newTask = await createTask({ title,  dueDate });
    res.status(201).json(newTask);
};

// READ - Handler para obtener todas las tareas
const getAllTasksHandler: AsyncRouteHandler = async (_req, res) => {
    const tasks = await getAllTasks();
    res.json(tasks);
};

// READ - Handler para obtener una tarea
const getTaskByIdHandler: AsyncRouteHandler = async (req, res) => {
    const { id } = req.params;
    const task = await getTaskById(id);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
};

// UPDATE - Handler para actualizar tarea
const updateTaskHandler: AsyncRouteHandler = async (req, res) => {
    const { id } = req.params;


    const parseResult = updateTaskSchema.safeParse(req.body);
    console.log(parseResult);
    if (!parseResult.success) {
        return res.status(400).json({
            status: "error",
            message: "Invalid request body",
            issues: parseResult.error.format()
        });
    }

    const updatedTask = await updateTask(id, parseResult.data);

    if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
};

// DELETE - Handler para eliminar tarea
const deleteTaskHandler: AsyncRouteHandler = async (req, res) => {
    const { id } = req.params;
    const deleted = await deleteTask(id);

    if (!deleted) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).end();
};

// PATCH - Cambiar prioridad de una tarea
const updatePriorityHandler: AsyncRouteHandler = async (req, res) => {
  const { id } = req.params;

  const parseResult = updatePrioritySchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      status: "error",
      message: "Invalid priority value",
      issues: parseResult.error.format()
    });
  }

  const { priority } = parseResult.data;

  const updatedTask = await updateTaskPriority(id, priority);
  if (!updatedTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(updatedTask);
};

// Asignación de rutas CON el wrapper asyncHandler
router.get('/tasks', asyncHandler(getAllTasksHandler));
router.get('/tasks/:id', asyncHandler(getTaskByIdHandler));
router.post('/task', asyncHandler(createTaskHandler));
router.put('/tasks/:id', asyncHandler(updateTaskHandler));
router.delete('/tasks/:id', asyncHandler(deleteTaskHandler));
router.patch('/tasks/:id/priority', asyncHandler(updatePriorityHandler));

export default router;