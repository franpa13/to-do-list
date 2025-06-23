import { createTask } from "../service/create-task";
import { AsyncRouteHandler } from "../types/task-types";

// CREATE - Handler para crear tarea
export const createTaskHandler: AsyncRouteHandler = async (req, res) => {
    const { title,  dueDate } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    const newTask = await createTask({ title,  dueDate });
    res.status(201).json(newTask);
};