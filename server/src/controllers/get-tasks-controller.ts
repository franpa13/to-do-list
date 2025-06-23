import { getAllTasks } from "../service/get-tasks";
import { AsyncRouteHandler } from "../types/task-types";

// READ - Handler para obtener todas las tareas
export const getAllTasksHandler: AsyncRouteHandler = async (_req, res) => {
    const tasks = await getAllTasks();
    res.json(tasks);
};