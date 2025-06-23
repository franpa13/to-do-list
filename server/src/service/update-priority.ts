import { DB } from "../db/db";
import { Priorities, Task } from "../types/task-types";
import { formatDateToSQLite } from "../utils/formatData";
import { getTaskById } from "./get-task";

export const updateTaskPriority = async (
    id: string,
    priority: Priorities
): Promise<Task | null> => {
    const currentTask = await getTaskById(id);
    if (!currentTask) return null;

    const updatedTask: Task = {
        ...currentTask,
        priority,
        updatedAt: new Date()
    };

    return new Promise((resolve, reject) => {
        DB.run(
            `UPDATE tasks SET priority = ?, updatedAt = ? WHERE id = ? AND deletedAt IS NULL`,
            [updatedTask.priority, formatDateToSQLite(updatedTask.updatedAt), id],
            (err) => {
                if (err) return reject(err);
                resolve(updatedTask);
            }
        );
    });
};