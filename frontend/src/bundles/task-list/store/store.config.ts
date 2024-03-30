import { DataStatus } from "~/framework/enums/data-status.enum";
import { List } from "../types/list.type";

const sliceName = 'task-list';

type TaskListsInitialState = {
    taskLists: List[] | [],
    dataStatus: typeof DataStatus[keyof typeof DataStatus],
    error: string | null,
}

const initialState: TaskListsInitialState = {
    taskLists: [],
    dataStatus: DataStatus.IDLE,
    error: null,
};

export { sliceName,initialState }