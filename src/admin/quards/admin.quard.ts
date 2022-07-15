import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.admin) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
