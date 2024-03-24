import { IsNotEmpty, IsString, IsOptional, Allow } from 'class-validator';
export class CreateTaskListDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @Allow()
  otherFieldsNotAllowed:never;
  }