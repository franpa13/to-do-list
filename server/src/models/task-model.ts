import { DB } from '../db/db';
import { nanoid } from 'nanoid';
import { Priorities, Task } from '../types/task-types';


export const createTask = async (taskData: {
    title: string;
    description: string;
}): Promise<Task> => {
    const id = nanoid();
    const newTask: Task = {
        id,
        title: taskData.title,
        description: taskData.description,
        completed: false,
        createdAt: new Date().toISOString(),
        priority: "LOW",
    };

    return new Promise((resolve, reject) => {
        DB.run(
            `INSERT INTO tasks (id, title, description, completed, createdAt, priority) 
       VALUES (?, ?, ?, ?, ?, ?)`,
            [
                newTask.id,
                newTask.title,
                newTask.description,
                newTask.completed ? 1 : 0,
                newTask.createdAt,
                newTask.priority
            ],
            (err) => {
                if (err) return reject(err);
                resolve(newTask)
            }
        );
    });
};

export const getAllTasks = async (): Promise<Task[]> => {
    return new Promise((resolve, reject) => {
        DB.all("SELECT * FROM tasks", [], (err, rows: Task[]) => {
            if (err) return reject(err);
            resolve(rows)
        });
    });
};

export const getTaskById = async (id: string): Promise<Task | null> => {
    return new Promise((resolve, reject) => {
        DB.get(
            "SELECT * FROM tasks WHERE id = ?",
            [id],
            (err, row: Task) => {
                if (err) return reject(err);
                if (!row) return resolve(null);
                resolve(row);
            }
        );
    });
};

export const updateTask = async (
    id: string,
    updates: { title?: string; description?: string; completed?: boolean }
): Promise<Task | null> => {
    const currentTask = await getTaskById(id);
    if (!currentTask) return null;

    const updatedTask = {
        ...currentTask,
        ...updates
    };

    return new Promise((resolve, reject) => {
        DB.run(
            `UPDATE tasks 
       SET title = ?, description = ?, completed = ? 
       WHERE id = ?`,
            [
                updatedTask.title,
                updatedTask.description,
                updatedTask.completed ? 1 : 0,
                id
            ],
            (err) => {
                if (err) return reject(err);
                resolve(updatedTask);
            }
        );
    });
};

export const deleteTask = async (id: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        DB.run(
            "DELETE FROM tasks WHERE id = ?",
            [id],
            function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0);
            }
        );
    });
};


export const updateTaskPriority = async (
    id: string,
    priority: Priorities
): Promise<Task | null> => {
    const currentTask = await getTaskById(id);
    if (!currentTask) return null;

    const updatedTask: Task = {
        ...currentTask,
        priority
    };

    return new Promise((resolve, reject) => {
        DB.run(
            `UPDATE tasks SET priority = ? WHERE id = ?`,
            [priority, id],
            (err) => {
                if (err) return reject(err);
                resolve(updatedTask);
            }
        );
    });
};
