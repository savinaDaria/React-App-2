import { configureStore } from '@reduxjs/toolkit';
import { AppEnvironment } from '../enums/app-environment.enum';

import { TaskListApiService } from '~/bundles/task-list/api/list-api';
import { reducer as taskListReducer } from '~/bundles/task-list/store/slice';
import { reducer as taskReducer } from '~/bundles/task-card/store/slice';
import { reducer as logsReducer } from '~/bundles/history-modal/store/slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { TaskApiService } from '~/bundles/task-card/api/task-api';
import { ActivityLogService } from '~/bundles/history-modal/api/log-api';

type RootReducer = {
    taskLists: typeof taskListReducer,
    task: typeof taskReducer,
    logs: typeof logsReducer
};

const SERVER_URL=import.meta.env.VITE_APP_PROXY_SERVER_URL;

const ExtraArguments = {
    listApi: new TaskListApiService(SERVER_URL),
    taskApi: new TaskApiService(SERVER_URL),
    activityLogApi: new ActivityLogService(SERVER_URL)
};

const store = configureStore({
    devTools: import.meta.env.VITE_APP_NODE_ENV!== AppEnvironment.PRODUCTION,
    reducer: {
      taskLists: taskListReducer ,
      currentTask:taskReducer ,
      logs:logsReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            thunk: {
                extraArgument: ExtraArguments,
            },
        }),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

type AsyncThunkConfig = {
    state: RootState;
    dispatch: AppDispatch;
    extra: typeof ExtraArguments; 
};

const useAppDispatch: () => AppDispatch = () =>
    useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;

export { type RootReducer , type RootState, type AsyncThunkConfig, store, useAppDispatch,useAppSelector };
