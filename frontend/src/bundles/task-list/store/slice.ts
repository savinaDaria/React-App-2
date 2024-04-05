import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createList, getLists, deleteList, updateList } from "./actions";
import { DataStatus } from "~/framework/enums/data-status.enum";
import { initialState, sliceName } from "./store.config";

const { reducer, actions } = createSlice({
    initialState,
    name: sliceName,
    reducers: {},
    extraReducers(builder) {

        //pending,rejected
        builder.addMatcher(
            isAnyOf(
                createList.pending,
                getLists.pending,
                deleteList.pending,
                updateList.pending
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                createList.rejected,
                getLists.rejected,
                deleteList.rejected,
                updateList.rejected
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

const taskListActions = {
    createList,
    getLists,
    deleteList,
    updateList,
    ...actions
};
export { taskListActions, reducer };