export class CreateTaskDto {
    name: string;
    description?: string;
    listId:number;
    priority?:string;
    dueDate?:Date;
  }