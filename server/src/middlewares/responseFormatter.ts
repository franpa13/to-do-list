import { Request, Response, NextFunction } from 'express';

export const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res);

    res.json = (body: any) => {
        // Si ya tiene status y message (por ejemplo desde errorHandler), no lo formatea
        if (body?.status && body?.message) {
            return originalJson(body);
        }

        return originalJson({
            status: 'success',
            message: 'OK',
            data: body
        });
    };

    next();
};
