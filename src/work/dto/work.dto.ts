import { IsNotEmpty, IsString } from 'class-validator';

export class WorkDto {
  @IsNotEmpty()
  @IsString()
  readonly position: string;

  @IsNotEmpty()
  @IsString()
  readonly work: string;

  @IsNotEmpty()
  @IsString()
  readonly location: string;
}
