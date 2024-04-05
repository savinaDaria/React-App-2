import { type CreateBoardRequest, type CreateBoardResponse } from './create-board.type';

type UpdateBoardForm= Partial<CreateBoardRequest> ;

type UpdateBoardRequest = UpdateBoardForm &
{
    id:number;
};

export {type UpdateBoardForm, type UpdateBoardRequest, type CreateBoardResponse as UpdateBoardResponse };