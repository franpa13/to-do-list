import { NextFunction, Request, RequestHandler, Response } from 'express';

export type Priorities = 'LOW'| 'MEDIUM'| 'HIGH'

export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
    priority: Priorities
}

// Tipo para el handler de rutas
export type AsyncRouteHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response>;

