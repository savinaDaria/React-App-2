import { type Task } from "~/bundles/task-card/types/task.type";

type CreateListRequest = {
  name: string,
  boardId:number
}

type CreateListResponse = {
  id: number,
  name: string,
  boardId:number,
  tasks: Task[],
  dateCreated: string,
  dateUpdated: string,
  recentlyCreated: boolean
}

export { type CreateListRequest, type CreateListResponse };