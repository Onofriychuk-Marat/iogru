import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
