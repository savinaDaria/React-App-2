import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createList, getLists, deleteList, updateList } from "./actions";
import { DataStatus } from "~/framework/enums/data-status.enum";
import { initialState, sliceName } from "./store.config";
import { createTask, deleteTask, updateTask, moveTask } from '~/bundles/task-card/store/actions';

const { reducer, actions } = createSlice({
    initialState,
    name: sliceName,
    reducers: {},
    extraReducers(builder) {
        //list
        builder.addCase(
            getLists.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                if (action.payload) {
                    state.taskLists = action.payload;
                }
            },
        );
        builder.addCase(
            createList.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                if (action.payload) state.taskLists = [action.payload, ...state.taskLists];
            },
        );
        builder.addCase(
            deleteList.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.taskLists = state.taskLists.filter(list => list.id !== action.payload?.id)
            },
        );
        builder.addCase(
            updateList.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                const mappedLists = state.taskLists.map(list => {
                    if (list.id == action.payload?.id) return action.payload;
                    return list;
                })
                state.taskLists = mappedLists;
            },
        );
        
        //task
        builder.addCase(
            createTask.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                const { payload } = action;
                const { listId } = payload || {};                

                if (!listId) {
                    return;
                }
                const updatedTaskLists = state.taskLists.map(list => {
                    if (list.id === listId && payload) {
                        return {
                            ...list,
                            tasks: [payload,...list.tasks],
                        };
                    }
                    return list;
                });
                state.taskLists = updatedTaskLists;
            },
        );
        builder.addCase(
            deleteTask.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                const { payload } = action;
                const { id } = payload || {};
        
                if (!id) {
                    return;
                }
                const updatedTaskLists = state.taskLists.map(list => {
                    if (list.tasks.some(task => task.id === id)) {
                        return {
                            ...list,
                            tasks: list.tasks.filter(task=>task.id!==id),
                        };
                    }
                    return list;
                });
                state.taskLists = updatedTaskLists;
            },
        );
        builder.addCase(
            updateTask.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                const { payload } = action;
                const { id } = payload || {};
        
                if (!id) {
                    return;
                }
                const updatedTaskLists = state.taskLists.map(list => {
                    if (list.tasks.some(task => task.id === id)) {
                        const updatedTasks = list.tasks.map(task => {
                            if (task.id === id) {
                                return { ...task, ...payload }; 
                            }
                            return task;
                        });
                        return { ...list, tasks: updatedTasks };
                    }
                    return list;
                });
                state.taskLists = updatedTaskLists;
            },
        );
        builder.addCase(
            moveTask.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                const { payload } = action;
                const { id ,listId} = payload || {};
        
                if (!id) {
                    return;
                }
                const updatedTaskLists = state.taskLists.map(list => {
                    if (list.tasks.some(task => task.id === id)) {
                        const updatedTasks = list.tasks.filter(task => task.id !== id);
                        return { ...list, tasks: updatedTasks };
                    }
                    if (list.id === listId && payload) {
                        return {
                            ...list,
                            tasks: [payload,...list.tasks],
                        };
                    }
                    return list;
                });
                state.taskLists = updatedTaskLists;
            },
        );

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