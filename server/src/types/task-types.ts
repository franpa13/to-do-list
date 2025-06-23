import { NextFunction, Request, RequestHandler, Response } from 'express';

export type Priorities = 'LOW' | 'MEDIUM' | 'HIGH'

export interface Task {
    id: string;
    title: string;
    description : string|null;
    completed: boolean;
    priority: Priorities;
    createdAt: Date;
    deletedAt: Date | null;
    updatedAt: Date | null;
    dueDate : Date | null
}

// Tipo para el handler de rutas
export type AsyncRouteHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response>;

// Tipo para las filas de la base de datos
export interface TaskRow {
    id: string;
    title: string;
    description: string | null;
    completed: number;
    priority: Priorities;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
    dueDate: string | null;
}