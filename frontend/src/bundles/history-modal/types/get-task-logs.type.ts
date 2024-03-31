import { type ActivityLog } from './log.type';

type GetTaskLogsRequest = {
    taskId: number;
};
type GetTaskLogsResponse = ActivityLog[];
export { type GetTaskLogsRequest, type GetTaskLogsResponse };