import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class RegistrationUserDto {
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsInt()
  @IsNotEmpty()
  readonly age: number;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
