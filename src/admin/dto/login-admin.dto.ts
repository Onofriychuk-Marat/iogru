import { IsString } from 'class-validator';

export class LoginAdminDto {
  @IsString()
  readonly login: string;

  @IsString()
  readonly password: string;
}
