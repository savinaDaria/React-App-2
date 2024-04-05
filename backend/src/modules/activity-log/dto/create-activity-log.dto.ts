export class CreateActivityLogDto {
    boardId: number;
    taskId: number;
    oldValue?:string;
    newValue?:string;
    actionType:string;
    property?:string;
  }