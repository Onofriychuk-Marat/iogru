import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
export declare class AuthAdminMiddleware implements NestMiddleware {
    use(request: any, _: Response, next: NextFunction): Promise<void>;
}
