import { TaskPriority } from '~/bundles/common/enums/enums';
import { Task } from './task.type';

type CreateTaskRequest = {
  listId: number,
  name: string,
  description: string | null,
  priority: typeof TaskPriority[ keyof typeof TaskPriority],
  dueDate?: string,
}

type CreateTaskResponse = Task;

export { type CreateTaskRequest, type CreateTaskResponse };