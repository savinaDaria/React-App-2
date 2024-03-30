import { DataStatus } from "~/framework/enums/data-status.enum";
import { Task } from "../types/task.type";

const sliceName = 'currentTask';

type TaskInitialState = {
    task: Task | null,
    dataStatus: typeof DataStatus[keyof typeof DataStatus],
    error: string | null,
}

const initialState: TaskInitialState = {
    task: null,
    dataStatus: DataStatus.IDLE,
    error: null,
};

export { sliceName,initialState }