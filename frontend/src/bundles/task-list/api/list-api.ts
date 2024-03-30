import { HttpApiBase } from "~/framework/api/api-base";
import { GetAllListsResponse } from "../types/get-all-lists.type";
import { CreateListRequest, CreateListResponse } from "../types/create-list.type";
import { UpdateListRequest, UpdateListResponse } from "../types/update-list.type";
import { DeleteListRequest } from "../types/delete-list.type";

class TaskListApiService extends HttpApiBase {
    public async getAllLists(): Promise<GetAllListsResponse> {
        return this.get<GetAllListsResponse>('/task-list');
    }

    public async createList(data: CreateListRequest): Promise<CreateListResponse> {
        return this.post<CreateListResponse>('/task-list', data);
    }

    public async deleteList({ id }: DeleteListRequest): Promise<void> {
        return this.delete<void>(`/task-list/${id}`);
    }

    public async updateList(id: number, data: Partial<UpdateListRequest>): Promise<UpdateListResponse> {
        return this.update<UpdateListResponse>(`/task-list/${id}`, data);
    }
}

export { TaskListApiService };
