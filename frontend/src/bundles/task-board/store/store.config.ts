import { DataStatus } from "~/framework/enums/data-status.enum";
import { Board } from "../types/board.type";

const sliceName = 'board';

type BoardsInitialState = {
    board: Board|null,
    dataStatus: typeof DataStatus[keyof typeof DataStatus],
    error: string | null,
}

const initialState: BoardsInitialState = {
    board:null,
    dataStatus: DataStatus.IDLE,
    error: null,
};

export { sliceName,initialState }