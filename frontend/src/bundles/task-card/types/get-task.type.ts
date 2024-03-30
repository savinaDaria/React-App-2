import { type CreateTaskResponse } from './create-task.type';

type GetTaskRequest = Pick<CreateTaskResponse,'id'>;

export { type GetTaskRequest, type CreateTaskResponse as GetTaskResponse };