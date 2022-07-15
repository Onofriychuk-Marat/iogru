import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AuthAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
