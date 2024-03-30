import { TaskPriority } from "~/bundles/common/enums/task-priority.enum";

type Task = {
    id: number,
    listId: number,
    name: string,
    description?: string,
    priority: typeof TaskPriority[keyof typeof TaskPriority],
    dueDate?: string,
    dateCreated: string,
    dateUpdated: string,
  }
  
  export {type Task};