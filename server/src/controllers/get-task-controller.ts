import { getTaskById } from "../service/get-task";
import { AsyncRouteHandler } from "../types/task-types";

// READ - Handler para obtener una tarea
export const getTaskByIdHandler: AsyncRouteHandler = async (req, res) => {
    const { id } = req.params;
    const task = await getTaskById(id);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
};
