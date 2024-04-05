import { HttpApiBase } from "~/framework/api/api-base";
import { GetAllBoardsResponse } from "../types/get-all-boards.type";
import { CreateBoardRequest, CreateBoardResponse } from "../types/create-board.type";
import { UpdateBoardRequest, UpdateBoardResponse } from "../types/update-board.type";
import { DeleteBoardRequest } from "../types/delete-board.type";
import { GetBoardRequest, GetBoardResponse } from "../types/get-board.type";

class BoardApiService extends HttpApiBase {
    public async getAllBoards(): Promise<GetAllBoardsResponse> {
        return this.get<GetAllBoardsResponse>('/boards');
    }

    public async getBoardById({ boardId }: GetBoardRequest): Promise<GetBoardResponse> {
        return this.get<GetBoardResponse>(`/boards/${boardId}`);
    }

    public async createBoard(data: CreateBoardRequest): Promise<CreateBoardResponse> {
        return this.post<CreateBoardResponse>('/boards', data);
    }

    public async deleteBoard({ id }: DeleteBoardRequest): Promise<void> {
        return this.delete<void>(`/boards/${id}`);
    }

    public async updateBoard(id: number, data: Partial<UpdateBoardRequest>): Promise<UpdateBoardResponse> {
        return this.update<UpdateBoardResponse>(`/boards/${id}`, data);
    }
}

export { BoardApiService };
