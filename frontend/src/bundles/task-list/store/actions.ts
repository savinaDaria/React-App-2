import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "~/framework/store/store";
import { GetAllListsResponse, GetListsRequest } from "../types/get-lists.type";
import { sliceName } from "./store.config";
import { DeleteListRequest } from "../types/delete-list.type";
import { CreateListRequest, CreateListResponse } from "../types/create-list.type";
import { UpdateListRequest, UpdateListResponse } from "../types/update-list.type";

const getLists = createAsyncThunk<
    GetAllListsResponse | null,
    GetListsRequest,
    AsyncThunkConfig
>(
    `${sliceName}/get-all-lists`,
    async (_findPayload, { extra, rejectWithValue }) => {

        try {
            const lists = await extra.listApi.getAllLists(_findPayload.boardId);
            return lists.map(list => ({ ...list, recentlyCreated: false }));
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            throw error;
        }
    },
);

const createList = createAsyncThunk<
    CreateListResponse | null,
    CreateListRequest,
    AsyncThunkConfig
>(
    `${sliceName}/create-list`,
    async (payload, { extra, rejectWithValue }) => {

        try {
            const list = await extra.listApi.createList(payload);
            return { ...list, recentlyCreated: true };
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            throw error;
        }
    },
);

const updateList = createAsyncThunk<
    UpdateListResponse | null,
    UpdateListRequest,
    AsyncThunkConfig
>(
    `${sliceName}/update-list`,
    async (payload, { extra, rejectWithValue }) => {
        const { id, ...updateBody } = payload;

        try {
            const list = await extra.listApi.updateList(id, updateBody);
            return { ...list, recentlyCreated: false };
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            throw error;
        }
    },
);

const deleteList = createAsyncThunk<
    DeleteListRequest | null,
    DeleteListRequest,
    AsyncThunkConfig
>(
    `${sliceName}/delete-list`,
    async (payload, { extra, rejectWithValue }) => {

        try {
            await extra.listApi.deleteList(payload);
            return payload;
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
           throw error;
        }
    },
);

export { createList, deleteList, getLists, updateList };
