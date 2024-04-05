import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "~/framework/store/store";
import { GetAllBoardsResponse } from "../types/get-all-boards.type";
import { sliceName } from "./store.config";
import { DeleteBoardRequest } from "../types/delete-board.type";
import { CreateBoardRequest, CreateBoardResponse } from "../types/create-board.type";
import { UpdateBoardRequest, UpdateBoardResponse } from "../types/update-board.type";
import { GetBoardRequest, GetBoardResponse } from "../types/get-board.type";

const getBoards = createAsyncThunk<
    GetAllBoardsResponse | null,
    undefined,
    AsyncThunkConfig
>(
    `${sliceName}/get-all-boards`,
    async (_findPayload, { extra, rejectWithValue }) => {

        try {
            const boards = await extra.boardApi.getAllBoards();
            return boards.map(board => ({ ...board, recentlyCreated: false }));
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            throw error;
        }
    },
);

const getOneBoard = createAsyncThunk<
    GetBoardResponse | null,
    GetBoardRequest,
    AsyncThunkConfig
>(
    `${sliceName}/get-board`,
    async (_findPayload, { extra, rejectWithValue }) => {

        try {
            const board = await extra.boardApi.getBoardById(_findPayload);
            return board;
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            throw error;
        }
    },
);
const createBoard = createAsyncThunk<
    CreateBoardResponse | null,
    CreateBoardRequest,
    AsyncThunkConfig
>(
    `${sliceName}/create-board`,
    async (payload, { extra, rejectWithValue }) => {

        try {
            const board = await extra.boardApi.createBoard(payload);
            return { ...board, recentlyCreated: true };
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            throw error;
        }
    },
);

const updateBoard = createAsyncThunk<
    UpdateBoardResponse | null,
    UpdateBoardRequest,
    AsyncThunkConfig
>(
    `${sliceName}/update-board`,
    async (payload, { extra, rejectWithValue }) => {
        const { id, ...updateBody } = payload;

        try {
            const board = await extra.boardApi.updateBoard(id, updateBody);
            return { ...board, recentlyCreated: false };
        } catch (error) {
            rejectWithValue({
                _type: 'rejected',
                error,
            });
            throw error;
        }
    },
);

const deleteBoard = createAsyncThunk<
    DeleteBoardRequest | null,
    DeleteBoardRequest,
    AsyncThunkConfig
>(
    `${sliceName}/delete-board`,
    async (payload, { extra, rejectWithValue }) => {

        try {
            await extra.boardApi.deleteBoard(payload);
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

export { createBoard, deleteBoard, getBoards, getOneBoard, updateBoard };
