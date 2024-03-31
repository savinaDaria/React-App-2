import { type Task } from "~/bundles/task-card/types/task.type";

type ActivityLog = {
  id: number,
  taskId:number,
  task:Task,
  actionType: string;
  property: string | null;
  oldValue: string | null;
  newValue: string | null;
  dateCreated: string
}

export { type ActivityLog };