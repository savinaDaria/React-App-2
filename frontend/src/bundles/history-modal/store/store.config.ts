import { DataStatus } from "~/framework/enums/data-status.enum";
import { ActivityLog } from "../types/log.type";

const sliceName = 'history';

type ActivityLogInitialState = {
    logs:ActivityLog[] | [],
    dataStatus: typeof DataStatus[keyof typeof DataStatus],
    error: string | null,
}

const initialState: ActivityLogInitialState = {
    logs:[],
    dataStatus: DataStatus.IDLE,
    error: null,
};

export { sliceName,initialState }