import { RequestHandler } from "express";
import { AsyncRouteHandler } from "../types/task-types";

// Wrapper para manejar errores en handlers asíncronos
export const asyncHandler = (fn: AsyncRouteHandler): RequestHandler => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
