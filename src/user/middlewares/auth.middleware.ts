import { JWT_SECRET } from 'src/config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user.service';
import { WorkService } from 'src/work/work.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private workService: WorkService,
  ) {}

  async use(request: any, _: Response, next: NextFunction) {
    if (!request.headers.authorization) {
      request.user = null;
      next();
      return;
    }
    const token = request.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, JWT_SECRET);
      const user = await this.userService.findById(decode.id);
      if (user.work) {
        user.work = await this.workService.findById(user.work._id);
      }
      request.user = user;
      next();
    } catch (error) {
      request.user = null;
      next();
    }
  }
}
