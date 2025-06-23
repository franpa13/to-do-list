import { updatePrioritySchema } from "../schemas/task-schema";
import { updateTaskPriority } from "../service/update-priority";
import { AsyncRouteHandler } from "../types/task-types";

// PATCH - Cambiar prioridad de una tarea
export const updatePriorityHandler: AsyncRouteHandler = async (req, res) => {
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