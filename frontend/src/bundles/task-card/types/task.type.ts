import { TaskPriority } from "~/bundles/common/enums/task-priority.enum";
import { ActivityLog } from "~/bundles/history-modal/types/log.type";

type Task = {
    id: number,
    listId: number,
    name: string,
    description?: string,
    priority: typeof TaskPriority[keyof typeof TaskPriority],
    dueDate?: string,
    dateCreated: string,
    dateUpdated: string,
    logs:ActivityLog[]
  }
  
  export {type Task};