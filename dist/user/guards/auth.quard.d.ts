import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AuthUserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
