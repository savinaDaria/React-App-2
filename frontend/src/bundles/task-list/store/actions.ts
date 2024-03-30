import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "~/framework/store/store";
import { GetAllListsResponse } from "../types/get-all-lists.type";
import { sliceName } from "./store.config";
import { DeleteListRequest } from "../types/delete-list.type";
import { CreateListRequest, CreateListResponse } from "../types/create-list.type";
import { UpdateListRequest, UpdateListResponse } from "../types/update-list.type";

const getLists = createAsyncThunk<
    GetAllListsResponse | null,
    undefined,
    AsyncThunkConfig
>(
    `${sliceName}/get-all-lists`,
    async (_findPayload, { extra, rejectWithValue }) => {

        try {
            const lists = await extra.listApi.getAllLists();
            return lists.map(list => ({ ...list, recentlyCreated: false }));
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            return null;
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
            return null;
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
            return null;
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
            return null;
        }
    },
);

export { createList, deleteList, getLists, updateList };
