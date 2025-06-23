import { deleteTask } from "../service/delete-task";
import { AsyncRouteHandler } from "../types/task-types";

// DELETE - Handler para eliminar tarea
export const deleteTaskHandler: AsyncRouteHandler = async (req, res) => {
    const { id } = req.params;
    const deleted = await deleteTask(id);

    if (!deleted) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).end();
};