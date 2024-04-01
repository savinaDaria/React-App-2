import { type CreateTaskRequest, type CreateTaskResponse } from './create-task.type';
type UpdateTaskForm= Partial<CreateTaskRequest>;
type UpdateTaskRequest = Partial<CreateTaskRequest> &
{
    dueDate?:string|undefined;
    id:number;
};

export { type UpdateTaskForm, type UpdateTaskRequest, type CreateTaskResponse as UpdateTaskResponse };