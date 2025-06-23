// import { DB } from '../db/db';
// import { nanoid } from 'nanoid';
// import { Priorities, Task, TaskRow } from '../types/task-types';




// // CRUD Operations
// export const createTask = async (taskData: {
//     title: string;
//     dueDate: Date | string | null;
// }): Promise<Task> => {
//     const id = nanoid();
//     const now = new Date();
//     const due = taskData.dueDate ? new Date(taskData.dueDate) : null;

//     const newTask: Task = {
//         id,
//         title: taskData.title,
//         description: null,
//         completed: false,
//         priority: 'LOW',
//         createdAt: now,
//         updatedAt: null,
//         deletedAt: null,
//         dueDate: due,
//     };

//     return new Promise((resolve, reject) => {
//         DB.run(
//             `INSERT INTO tasks (id, title, description, completed, createdAt, updatedAt, deletedAt, dueDate, priority) 
//              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [
//                 newTask.id,
//                 newTask.title,
//                 newTask.description,
//                 toSQLiteBoolean(newTask.completed),
//                 formatDateToSQLite(newTask.createdAt),
//                 formatDateToSQLite(newTask.updatedAt),
//                 formatDateToSQLite(newTask.deletedAt),
//                 formatDateToSQLite(newTask.dueDate),
//                 newTask.priority
//             ],
//             (err) => {
//                 if (err) return reject(err);
//                 resolve(newTask);
//             }
//         );
//     });
// };

// export const getAllTasks = async (): Promise<Task[]> => {
//     return new Promise((resolve, reject) => {
//         DB.all("SELECT * FROM tasks WHERE deletedAt IS NULL", [], (err, rows: TaskRow[]) => {
//             if (err) return reject(err);
//             resolve(rows.map(parseTask));
//         });
//     });
// };

// export const getTaskById = async (id: string): Promise<Task | null> => {
//     return new Promise((resolve, reject) => {
//         DB.get(
//             "SELECT * FROM tasks WHERE id = ? AND deletedAt IS NULL", 
//             [id], 
//             (err, row: TaskRow) => {
//                 if (err) return reject(err);
//                 resolve(row ? parseTask(row) : null);
//             }
//         );
//     });
// };

// export const updateTask = async (
//     id: string,
//     updates: { 
//         title?: string; 
//         description?: string; 
//         completed?: boolean; 
//         dueDate?: Date | string | null 
//     }
// ): Promise<Task | null> => {
//     const currentTask = await getTaskById(id);
//     if (!currentTask) return null;

//     const updatedTask: Task = {
//         ...currentTask,
//         title: updates.title ?? currentTask.title,
//         description: updates.description ?? currentTask.description,
//         completed: updates.completed ?? currentTask.completed,
//         dueDate: updates.dueDate !== undefined ? 
//             (updates.dueDate ? new Date(updates.dueDate) : null) : 
//             currentTask.dueDate,
//         updatedAt: new Date(),
//     };

//     return new Promise((resolve, reject) => {
//         DB.run(
//             `UPDATE tasks 
//              SET title = ?, description = ?, completed = ?, updatedAt = ?, dueDate = ?
//              WHERE id = ? AND deletedAt IS NULL`,
//             [
//                 updatedTask.title,
//                 updatedTask.description,
//                 toSQLiteBoolean(updatedTask.completed),
//                 formatDateToSQLite(updatedTask.updatedAt),
//                 formatDateToSQLite(updatedTask.dueDate),
//                 id
//             ],
//             (err) => {
//                 if (err) return reject(err);
//                 resolve(updatedTask);
//             }
//         );
//     });
// };

// export const deleteTask = async (id: string): Promise<boolean> => {
//     const now = formatDateToSQLite(new Date());

//     return new Promise((resolve, reject) => {
//         DB.run(
//             `UPDATE tasks SET deletedAt = ?, updatedAt = ? WHERE id = ? AND deletedAt IS NULL`,
//             [now, now, id],
//             function (err) {
//                 if (err) return reject(err);
//                 resolve(this.changes > 0);
//             }
//         );
//     });
// };

// export const updateTaskPriority = async (
//     id: string,
//     priority: Priorities
// ): Promise<Task | null> => {
//     const currentTask = await getTaskById(id);
//     if (!currentTask) return null;

//     const updatedTask: Task = {
//         ...currentTask,
//         priority,
//         updatedAt: new Date()
//     };

//     return new Promise((resolve, reject) => {
//         DB.run(
//             `UPDATE tasks SET priority = ?, updatedAt = ? WHERE id = ? AND deletedAt IS NULL`,
//             [updatedTask.priority, formatDateToSQLite(updatedTask.updatedAt), id],
//             (err) => {
//                 if (err) return reject(err);
//                 resolve(updatedTask);
//             }
//         );
//     });
// };