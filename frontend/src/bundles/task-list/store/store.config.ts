import { DataStatus } from "~/framework/enums/data-status.enum";

const sliceName = 'task-list';

type TaskListsInitialState = {
    dataStatus: typeof DataStatus[keyof typeof DataStatus],
    error: string | null,
}

const initialState: TaskListsInitialState = {
    dataStatus: DataStatus.IDLE,
    error: null,
};

export { sliceName,initialState }