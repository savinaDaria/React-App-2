import { type Task } from "~/bundles/task-card/types/task.type";

type CreateListRequest = {
  name: string,
}

type CreateListResponse = {
  id: number,
  name: string,
  tasks: Task[],
  dateCreated: string,
  dateUpdated: string,
  recentlyCreated: boolean
}

export { type CreateListRequest, type CreateListResponse };