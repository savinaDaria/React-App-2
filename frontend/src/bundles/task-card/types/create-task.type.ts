import { TaskPriority } from '~/bundles/common/enums/enums';

type CreateTaskRequest = {
  listId: number,
  name: string,
  description?: string,
  priority: typeof TaskPriority[ keyof typeof TaskPriority],
  dueDate?: string,
}

type CreateTaskResponse = {
  id: number,
  listId: number,
  name: string,
  description?: string,
  priority: typeof TaskPriority[ keyof typeof TaskPriority],
  dueDate?: string,
  dateCreated: string,
  dateUpdated: string,
}

export { type CreateTaskRequest, type CreateTaskResponse };