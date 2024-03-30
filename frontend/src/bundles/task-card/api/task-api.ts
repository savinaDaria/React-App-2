import { HttpApiBase } from "~/framework/api/api-base";
import { type GetTaskRequest, type GetTaskResponse } from "../types/get-task.type";
import { type CreateTaskRequest, type CreateTaskResponse } from "../types/create-task.type";
import { type UpdateTaskRequest, type UpdateTaskResponse } from "../types/update-task.type";
import { type DeleteTaskRequest } from "../types/delete-task.type";

class TaskApiService extends HttpApiBase {
    public async getTask({ id } : GetTaskRequest): Promise<GetTaskResponse> {
        return this.get<GetTaskResponse>(`/tasks/${id}`);
    }

    public async createTask(data: CreateTaskRequest): Promise<CreateTaskResponse> {
        return this.post<CreateTaskResponse>('/tasks', data);
    }

    public async deleteTask({ id }: DeleteTaskRequest): Promise<void> {
        return this.delete<void>(`/tasks/${id}`);
    }

    public async updateTask(id: number, data: Partial<UpdateTaskRequest>): Promise<UpdateTaskResponse> {
        return this.update<UpdateTaskResponse>(`/tasks/${id}`, data);
    }
}

export { TaskApiService };
