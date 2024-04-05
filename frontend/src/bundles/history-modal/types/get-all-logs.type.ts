import { type ActivityLog } from './log.type';

type GetAllLogsResponse = ActivityLog[];
type GetAllLogsRequest = {
    boardId:number;
}
export {type GetAllLogsRequest, type GetAllLogsResponse };