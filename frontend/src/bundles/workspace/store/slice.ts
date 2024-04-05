import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { DataStatus } from "~/framework/enums/data-status.enum";
import { initialState, sliceName } from "./store.config";
import { createBoard, deleteBoard, getBoards, getOneBoard, updateBoard } from "~/bundles/task-board/store/actions";

const { reducer, actions } = createSlice({
    initialState,
    name: sliceName,
    reducers: {
    },
    extraReducers(builder) {

        //board
        builder.addCase(
            getBoards.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                if (action.payload) {
                    state.boards = action.payload;
                }
            },
        );
        builder.addCase(
            createBoard.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                if (action.payload) state.boards = [action.payload, ...state.boards];
            },
        );
        builder.addCase(
            deleteBoard.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.boards = state.boards.filter(board => board.id !== action.payload?.id)
            },
        );
        builder.addCase(
            updateBoard.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                const mappedBoards = state.boards.map(board => {
                    if (board.id == action.payload?.id) return action.payload;
                    return board;
                })
                state.boards = mappedBoards;
            },
        );

        builder.addMatcher(
            isAnyOf(
                createBoard.pending,
                getBoards.pending,
                getOneBoard.pending,
                deleteBoard.pending,
                updateBoard.pending
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                createBoard.rejected,
                getBoards.rejected,
                getOneBoard.rejected,
                deleteBoard.rejected,
                updateBoard.rejected
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

const boardActions = {
    createBoard,
    getBoards,
    getOneBoard,
    deleteBoard,
    updateBoard,
    ...actions
};
export { boardActions, reducer };