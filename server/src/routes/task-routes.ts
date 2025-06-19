import { Router } from 'express';
import {  AsyncRouteHandler, Priorities } from '../types/task-types';
import { asyncHandler } from '../utils/handlerAsync';
import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskPriority
} from '../models/task-model';

const router = Router();

// CREATE - Handler para crear tarea
const createTaskHandler: AsyncRouteHandler = async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    const newTask = await createTask({ title, description });
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
    const { title, description, completed } = req.body;
    const updatedTask = await updateTask(id, { title, description, completed });

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
    const { priority } = req.body;

    const allowed: Priorities[] = ['LOW', 'MEDIUM', 'HIGH'];
    if (!allowed.includes(priority)) {
        return res.status(400).json({ error: "Invalid priority value. Use LOW, MEDIUM or HIGH." });
    }

    const updatedTask = await updateTaskPriority(id, priority);
    if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
};

// Asignación de rutas CON el wrapper asyncHandler
router.get('/tasks', asyncHandler(getAllTasksHandler));
router.get('/task/:id', asyncHandler(getTaskByIdHandler));
router.post('/task', asyncHandler(createTaskHandler));
router.put('/task/:id', asyncHandler(updateTaskHandler));
router.delete('/task/:id', asyncHandler(deleteTaskHandler));
router.patch('/task/:id/priority', asyncHandler(updatePriorityHandler));

export default router;