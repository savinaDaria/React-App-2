import { type CreateTaskRequest, type CreateTaskResponse } from './create-task.type';

type MoveTaskRequest = Pick<CreateTaskRequest,"listId"> &
{
    id:number;
};

export { type MoveTaskRequest, type CreateTaskResponse as MoveTaskResponse };