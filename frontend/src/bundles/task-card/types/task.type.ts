import { TaskPriority } from "~/bundles/common/enums/task-priority.enum";
import { ActivityLog } from "~/bundles/history-modal/types/log.type";
import { List } from "~/bundles/task-list/types/list.type";

type Task = {
    id: number,
    listId: number,
    name: string,
    description: string | null,
    priority: typeof TaskPriority[keyof typeof TaskPriority],
    dueDate?: string,
    dateCreated: string,
    dateUpdated: string,
    logs:ActivityLog[],
    list?: List
  }
  
  export {type Task};