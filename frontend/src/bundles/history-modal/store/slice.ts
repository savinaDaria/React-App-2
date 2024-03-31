import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getAllLogs, getTaskLogs } from "./actions";
import { DataStatus } from "~/framework/enums/data-status.enum";
import { initialState, sliceName } from "./store.config";


const { reducer, actions } = createSlice({
    initialState,
    name: sliceName,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            getTaskLogs.fulfilled,
            (state) => {
                state.dataStatus = DataStatus.FULFILLED;
            },
        );
        builder.addCase(
            getAllLogs.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                if (action.payload) state.logs = action.payload;
            },
        );
        builder.addMatcher(
            isAnyOf(
                getAllLogs.pending,
                getTaskLogs.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                getAllLogs.rejected,
                getTaskLogs.rejected
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

const logActions = {
    getAllLogs,
    getTaskLogs,
    ...actions
};
export { logActions, reducer };