import { type CreateTaskRequest, type CreateTaskResponse } from './create-task.type';

type UpdateTaskRequest = Partial<CreateTaskRequest> &
{
    id:number;
};

export { type UpdateTaskRequest, type CreateTaskResponse as UpdateTaskResponse };