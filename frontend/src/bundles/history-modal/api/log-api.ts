import { HttpApiBase } from "~/framework/api/api-base";
import { type GetAllLogsResponse } from "../types/get-all-logs.type";
import { type GetTaskLogsResponse, type GetTaskLogsRequest } from "../types/get-task-logs.type";

class ActivityLogService extends HttpApiBase {
    public async getAllLogs(): Promise<GetAllLogsResponse> {
        return this.get<GetAllLogsResponse>('/activity-logs');
    }

    public async getTaskLogs(data:GetTaskLogsRequest): Promise<GetTaskLogsResponse> {
        return this.get<GetTaskLogsResponse>(`/activity-logs/:${data.taskId}`);
    }
}

export { ActivityLogService };
