import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "~/framework/store/store";
import { sliceName } from "./store.config";
import { GetAllLogsResponse } from "../types/get-all-logs.type";
import { GetTaskLogsRequest, GetTaskLogsResponse } from "../types/get-task-logs.type";

const getAllLogs = createAsyncThunk<
    GetAllLogsResponse | null,
    undefined,
    AsyncThunkConfig
>(
    `${sliceName}/get-all-logs`,
    async (_findPayload, { extra, rejectWithValue }) => {

        try {
            const task = await extra.activityLogApi.getAllLogs();
            return task;
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            throw error;
        }
    },
);

const getTaskLogs = createAsyncThunk<
    GetTaskLogsResponse | null,
    GetTaskLogsRequest,
    AsyncThunkConfig
>(
    `${sliceName}/get-task-logs`,
    async (payload, { extra, rejectWithValue }) => {

        try {
            const task = await extra.activityLogApi.getTaskLogs(payload);
            return task;
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            throw error;
        }
    },
);


export { getAllLogs, getTaskLogs };
