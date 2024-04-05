import { createSlice } from "@reduxjs/toolkit";
import { createBoard, getBoards, getOneBoard, deleteBoard, updateBoard } from "./actions";
import { DataStatus } from "~/framework/enums/data-status.enum";
import { initialState, sliceName } from "./store.config";
import { createList, deleteList, getLists, updateList } from "~/bundles/task-list/store/actions";
import { createTask, deleteTask, moveTask, updateTask } from "~/bundles/task-card/store/actions";

const { reducer, actions } = createSlice({
    initialState,
    name: sliceName,
    reducers: {
        resetCurrentBoard: () => initialState,
    },
    extraReducers(builder) {
        //tasks
        builder.addCase(
            createTask.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                const { payload } = action;
                const { listId } = payload || {};

                if (!listId || !state.board) {
                    return;
                }
                const updatedTaskLists = state.board?.lists.map(list => {
                    if (list.id === listId && payload) {
                        return {
                            ...list,
                            tasks: [payload, ...list.tasks],
                        };
                    }
                    return list;
                });
                state.board.lists = updatedTaskLists;
            },
        );
        builder.addCase(
            deleteTask.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                const { payload } = action;
                const { id } = payload || {};

                if (!id || ! state.board) {
                    return;
                }
                const updatedTaskLists =state.board?.lists.map(list => {
                    if (list.tasks.some(task => task.id === id)) {
                        return {
                            ...list,
                            tasks: list.tasks.filter(task => task.id !== id),
                        };
                    }
                    return list;
                });
                state.board.lists = updatedTaskLists;
            },
        );
        builder.addCase(
            updateTask.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                const { payload } = action;
                const { id } = payload || {};

                if (!id || !state.board) {
                    return;
                }
                const updatedTaskLists = state.board?.lists.map(list => {
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
                state.board.lists = updatedTaskLists;
            },
        );
        builder.addCase(
            moveTask.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                const { payload } = action;
                const { id, listId } = payload || {};

                if (!id || !state.board) {
                    return;
                }
                const updatedTaskLists =state.board?.lists.map(list => {
                    if (list.tasks.some(task => task.id === id)) {
                        const updatedTasks = list.tasks.filter(task => task.id !== id);
                        return { ...list, tasks: updatedTasks };
                    }
                    if (list.id === listId && payload) {
                        return {
                            ...list,
                            tasks: [payload, ...list.tasks],
                        };
                    }
                    return list;
                });
                state.board.lists = updatedTaskLists;
            },
        );
        //lists
        builder.addCase(
            getLists.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                if (action.payload && state.board) {
                    state.board.lists = action.payload;
                }
            },
        );
        builder.addCase(
            createList.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                if (action.payload && state.board)
                    state.board.lists = [action.payload, ...state.board.lists];
            },
        );
        builder.addCase(
            deleteList.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                if (action.payload && state.board)
                    state.board.lists = state.board.lists.filter(list => list.id !== action.payload?.id)
            },
        );
        builder.addCase(
            updateList.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                if (action.payload && state.board) {
                    const mappedLists = state.board.lists.map(list => {
                        if (list.id == action.payload?.id) return action.payload;
                        return list;
                    })
                    state.board.lists = mappedLists;
                }
            },
        );
        //board
        builder.addCase(
            getOneBoard.fulfilled,
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                if (action.payload) {
                    state.board = action.payload;
                }
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