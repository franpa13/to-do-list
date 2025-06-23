import { DB } from "../db/db";
import { Task } from "../types/task-types";
import { formatDateToSQLite, toSQLiteBoolean } from "../utils/formatData";
import { getTaskById } from "./get-task";

export const updateTask = async (
    id: string,
    updates: { 
        title?: string; 
        description?: string; 
        completed?: boolean; 
        dueDate?: Date | string | null 
    }
): Promise<Task | null> => {
    const currentTask = await getTaskById(id);
    if (!currentTask) return null;

    const updatedTask: Task = {
        ...currentTask,
        title: updates.title ?? currentTask.title,
        description: updates.description ?? currentTask.description,
        completed: updates.completed ?? currentTask.completed,
        dueDate: updates.dueDate !== undefined ? 
            (updates.dueDate ? new Date(updates.dueDate) : null) : 
            currentTask.dueDate,
        updatedAt: new Date(),
    };

    return new Promise((resolve, reject) => {
        DB.run(
            `UPDATE tasks 
             SET title = ?, description = ?, completed = ?, updatedAt = ?, dueDate = ?
             WHERE id = ? AND deletedAt IS NULL`,
            [
                updatedTask.title,
                updatedTask.description,
                toSQLiteBoolean(updatedTask.completed),
                formatDateToSQLite(updatedTask.updatedAt),
                formatDateToSQLite(updatedTask.dueDate),
                id
            ],
            (err) => {
                if (err) return reject(err);
                resolve(updatedTask);
            }
        );
    });
};