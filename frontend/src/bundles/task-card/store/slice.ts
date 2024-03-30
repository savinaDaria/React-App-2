import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createTask, getTask, deleteTask,moveTask, updateTask } from "./actions";
import { DataStatus } from "~/framework/enums/data-status.enum";
import { initialState, sliceName } from "./store.config";


const { reducer, actions } = createSlice({
    initialState,
    name: sliceName,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            getTask.fulfilled,
            (state) => {
                state.dataStatus = DataStatus.FULFILLED;
            },
        );
        builder.addMatcher(
            isAnyOf(
                createTask.pending,
                getTask.pending,
                deleteTask.pending,
                moveTask.pending,
                updateTask.pending
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                createTask.rejected,
                getTask.rejected,
                deleteTask.rejected,
                moveTask.rejected,
                updateTask.rejected
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

const taskActions = {
    createTask,
    getTask,
    deleteTask,
    updateTask,
    moveTask,
    ...actions
};
export { taskActions, reducer };