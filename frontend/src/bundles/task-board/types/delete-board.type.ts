import { type CreateBoardResponse } from './create-board.type';

type DeleteBoardRequest = Pick<CreateBoardResponse,'id'>;

export { type DeleteBoardRequest };