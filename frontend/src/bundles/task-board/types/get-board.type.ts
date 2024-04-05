import { type CreateBoardResponse } from './create-board.type';

type GetBoardResponse = CreateBoardResponse;
type GetBoardRequest= {
    boardId:number;
}
export { type GetBoardRequest, type GetBoardResponse };