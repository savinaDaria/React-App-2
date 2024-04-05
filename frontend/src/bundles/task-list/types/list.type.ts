import { type Task } from "~/bundles/task-card/types/task.type";

type List = {
  id: number,
  name: string,
  boardId:number,
  dateCreated: string,
  dateUpdated: string,
  tasks:Task[],
  recentlyCreated:boolean;
}

export { type List };