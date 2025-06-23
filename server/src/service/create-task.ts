import { nanoid } from "nanoid";
import { Task } from "../types/task-types";
import { DB } from "../db/db";
import { formatDateToSQLite, toSQLiteBoolean } from "../utils/formatData";

export const createTask = async (taskData: {
    title: string;
    dueDate: Date | string | null;
}): Promise<Task> => {
    const id = nanoid();
    const now = new Date();
    const due = taskData.dueDate ? new Date(taskData.dueDate) : null;

    const newTask: Task = {
        id,
        title: taskData.title,
        description: null,
        completed: false,
        priority: 'LOW',
        createdAt: now,
        updatedAt: null,
        deletedAt: null,
        dueDate: due,
    };

    return new Promise((resolve, reject) => {
        DB.run(
            `INSERT INTO tasks (id, title, description, completed, createdAt, updatedAt, deletedAt, dueDate, priority) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                newTask.id,
                newTask.title,
                newTask.description,
                toSQLiteBoolean(newTask.completed),
                formatDateToSQLite(newTask.createdAt),
                formatDateToSQLite(newTask.updatedAt),
                formatDateToSQLite(newTask.deletedAt),
                formatDateToSQLite(newTask.dueDate),
                newTask.priority
            ],
            (err) => {
                if (err) return reject(err);
                resolve(newTask);
            }
        );
    });
};
