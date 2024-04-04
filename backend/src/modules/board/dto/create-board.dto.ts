import { IsNotEmpty, IsString, Allow } from 'class-validator';
export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @Allow()
  otherFieldsNotAllowed: never;
}