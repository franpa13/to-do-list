import { Task, TaskRow } from "../types/task-types";

// Conversión de fechas a formato SQLite
function formatDateToSQLite(date: Date | null): string | null {
    if (!date || isNaN(date.getTime())) return null;
    return date.toISOString().replace('T', ' ').split('.')[0];
}

// Parseo de filas DB a objetos Task
function parseTask(row: TaskRow): Task {
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        completed: row.completed === 1,
        priority: row.priority,
        createdAt: new Date(row.createdAt),
        updatedAt: row.updatedAt ? new Date(row.updatedAt) : null,
        deletedAt: row.deletedAt ? new Date(row.deletedAt) : null,
        dueDate: row.dueDate ? new Date(row.dueDate) : null
    };
}

// Conversión de booleanos para SQLite
function toSQLiteBoolean(value: boolean): number {
    return value ? 1 : 0;
}
export {formatDateToSQLite , parseTask , toSQLiteBoolean}