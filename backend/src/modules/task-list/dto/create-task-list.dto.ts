import { IsNotEmpty, IsString, Allow, IsNumber } from 'class-validator';
export class CreateTaskListDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  boardId: number;
  @Allow()
  otherFieldsNotAllowed:never;
  }