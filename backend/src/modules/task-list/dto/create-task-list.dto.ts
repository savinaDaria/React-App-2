import { IsNotEmpty, IsString, Allow } from 'class-validator';
export class CreateTaskListDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @Allow()
  otherFieldsNotAllowed:never;
  }