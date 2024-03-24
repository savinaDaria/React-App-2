import { IsNotEmpty, IsString, IsOptional, IsNumber, IsEnum, IsDateString, Allow } from 'class-validator';
import { TaskPriority } from '../enums/index';
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsNotEmpty()
  @IsNumber()
  listId: number;
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: string;
  @IsDateString()
  @IsOptional()
  dueDate?: Date;
  @Allow()
  otherFieldsNotAllowed:never;
}