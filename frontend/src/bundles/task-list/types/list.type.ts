import { type Task } from "~/bundles/task-card/types/task.type";

type List = {
  id: number,
  name: string,
  dateCreated: string,
  dateUpdated: string,
  tasks:Task[],
  recentlyCreated:boolean;
}

export { type List };