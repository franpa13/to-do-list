import { updateTaskSchema } from "../schemas/task-schema";
import { updateTask } from "../service/update-task";
import { AsyncRouteHandler } from "../types/task-types";

// UPDATE - Handler para actualizar tarea
export const updateTaskHandler: AsyncRouteHandler = async (req, res) => {
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