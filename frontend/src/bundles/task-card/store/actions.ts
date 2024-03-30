import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "~/framework/store/store";
import { GetTaskRequest, GetTaskResponse } from "../types/get-task.type";
import { sliceName } from "./store.config";
import { DeleteTaskRequest } from "../types/delete-task.type";
import { CreateTaskRequest, CreateTaskResponse } from "../types/create-task.type";
import { UpdateTaskRequest, UpdateTaskResponse } from "../types/update-task.type";
import { MoveTaskRequest, MoveTaskResponse } from "../types/move-task.type";

const getTask = createAsyncThunk<
    GetTaskResponse | null,
    GetTaskRequest,
    AsyncThunkConfig
>(
    `${sliceName}/get-task`,
    async (_findPayload, { extra, rejectWithValue }) => {

        try {
            const task = await extra.taskApi.getTask(_findPayload);
            return task;
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            return null;
        }
    },
);

const createTask = createAsyncThunk<
    CreateTaskResponse | null,
    CreateTaskRequest,
    AsyncThunkConfig
>(
    `${sliceName}/create-task`,
    async (payload, { extra, rejectWithValue }) => {

        try {
            const task = await extra.taskApi.createTask(payload);
            return { ...task, recentlyCreated: true };
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            return null;
        }
    },
);

const updateTask = createAsyncThunk<
    UpdateTaskResponse | null,
    UpdateTaskRequest,
    AsyncThunkConfig
>(
    `${sliceName}/update-task`,
    async (payload, { extra, rejectWithValue }) => {
        const { id, ...updateBody } = payload;

        try {
            const task = await extra.taskApi.updateTask(id, updateBody);
            return { ...task, recentlyCreated: false };
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            return null;
        }
    },
);

const moveTask = createAsyncThunk<
MoveTaskResponse | null,
MoveTaskRequest,
AsyncThunkConfig
>(
`${sliceName}/move-task`,
async (payload, { extra, rejectWithValue }) => {
    const { id, ...updateBody } = payload;
    try {
        const task = await extra.taskApi.updateTask(id, updateBody);
        return { ...task, recentlyCreated: false };
    } catch (error) {
        rejectWithValue({
            _type: 'rejected',
            error,
        });
        return null;
    }
},
);


const deleteTask = createAsyncThunk<
    DeleteTaskRequest | null,
    DeleteTaskRequest,
    AsyncThunkConfig
>(
    `${sliceName}/delete-task`,
    async (payload, { extra, rejectWithValue }) => {

        try {
            await extra.taskApi.deleteTask(payload);
            return payload;
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            return null;
        }
    },
);

export { createTask, deleteTask, getTask,moveTask, updateTask };
