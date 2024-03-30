import { type CreateTaskResponse } from './create-task.type';

type DeleteTaskRequest = Pick<CreateTaskResponse,'id'>;

export { type DeleteTaskRequest };