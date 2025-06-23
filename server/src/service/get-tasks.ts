import { DB } from "../db/db";
import { Task, TaskRow } from "../types/task-types";
import { parseTask } from "../utils/formatData";

export const getAllTasks = async (): Promise<Task[]> => {
    return new Promise((resolve, reject) => {
        DB.all("SELECT * FROM tasks WHERE deletedAt IS NULL", [], (err, rows: TaskRow[]) => {
            if (err) return reject(err);
            resolve(rows.map(parseTask));
        });
    });
};