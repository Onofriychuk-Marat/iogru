import { JWT_SECRET, LOGIN_ADMIN, PASSWORD_ADMIN } from 'src/config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthAdminMiddleware implements NestMiddleware {
  async use(request: any, _: Response, next: NextFunction) {
    if (!request.headers.authorization) {
      request.admin = null;
      next();
      return;
    }
    const token = request.headers.authorization.split(' ')[1];

    try {
      const admin = verify(token, JWT_SECRET);
      if (admin.login === LOGIN_ADMIN && admin.password === PASSWORD_ADMIN) {
        request.admin = admin;
      }
      next();
    } catch (error) {
      request.admin = null;
      next();
    }
  }
}
