import { DB } from "../db/db";
import { Task, TaskRow } from "../types/task-types";
import { parseTask } from "../utils/formatData";

export const getTaskById = async (id: string): Promise<Task | null> => {
    return new Promise((resolve, reject) => {
        DB.get(
            "SELECT * FROM tasks WHERE id = ? AND deletedAt IS NULL", 
            [id], 
            (err, row: TaskRow) => {
                if (err) return reject(err);
                resolve(row ? parseTask(row) : null);
            }
        );
    });
};