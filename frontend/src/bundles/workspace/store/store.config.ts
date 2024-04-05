import { Board } from "~/bundles/task-board/types/board.type";
import { DataStatus } from "~/framework/enums/data-status.enum";

const sliceName = 'data';

type WorkspaceInitialState = {
    boards: Board[] | [],
    dataStatus: typeof DataStatus[keyof typeof DataStatus],
    error: string | null,
}

const initialState: WorkspaceInitialState = {
    boards: [],
    dataStatus: DataStatus.IDLE,
    error: null,
};

export { sliceName,initialState }