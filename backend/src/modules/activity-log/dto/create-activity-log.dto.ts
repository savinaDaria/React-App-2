export class CreateActivityLogDto {
    taskId: number;
    oldValue?:string;
    newValue?:string;
    actionType:string;
    property?:string;
  }