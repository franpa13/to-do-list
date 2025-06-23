import { Request, Response, NextFunction } from 'express';

export const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res);

    res.json = <T>(body: T) => {
        if (
            typeof body === 'object' &&
            body !== null &&
            'status' in body &&
            'message' in body
        ) {
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
