import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { UserService } from '../user.service';
export declare class AuthMiddleware implements NestMiddleware {
    private userService;
    constructor(userService: UserService);
    use(request: any, _: Response, next: NextFunction): Promise<void>;
}
