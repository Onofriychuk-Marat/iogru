import { IsInt, IsString, IsOptional } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  readonly login: string;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsInt()
  readonly age: number;

  @IsOptional()
  @IsInt()
  readonly levelMood: number;

  @IsOptional()
  @IsString()
  readonly password: string;
}
