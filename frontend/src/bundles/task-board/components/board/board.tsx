import styles from './styles.module.scss';
import { TaskList } from '~/bundles/task-list/components/list/list';
import { BoardHeader } from '../board-header/board-header';
import { useCallback, useDispatch, useEffect, useSelector, useState } from '~/bundles/common/hooks/hooks';
import { taskListActions } from '~/bundles/task-list/store/slice';
import { DeleteListRequest } from '~/bundles/task-list/types/delete-list.type';
import { CreateListRequest } from '~/bundles/task-list/types/create-list.type';
import { UpdateListRequest } from '~/bundles/task-list/types/update-list.type';
import { RootState } from '~/framework/store/store';
import { logActions } from '~/bundles/history-modal/store/slice';

const getListsState = (state: RootState) => state.taskLists;

const TaskBoard: React.FC = () => {
    const dispatch = useDispatch();
    const [addingList, setAddingList] = useState(false);
    const lists = useSelector(
        (rootState) => getListsState(rootState).taskLists,
    );
    
    
    const handleGetLists = useCallback(() => {
        dispatch(taskListActions.getLists());
    },[dispatch]);

    const handleDeleteList = useCallback((request: DeleteListRequest) => {
        dispatch(taskListActions.deleteList(request));
    },[dispatch]);
    
    const handleCreateList = useCallback((request: CreateListRequest) => {
        dispatch(taskListActions.createList(request));
    },[dispatch]);
    
    const handleUpdateList = useCallback((request: UpdateListRequest) => {
        dispatch(taskListActions.updateList(request));
    },[dispatch]);

    const handleGetLogs = useCallback(() => {
        dispatch(logActions.getAllLogs());
    }, [dispatch]);

    useEffect(() => {
        handleGetLists();
    }, [handleGetLists])

    return (
        <div>
            <BoardHeader 
            onCreateList={handleCreateList}
            onHistoryOpen={handleGetLogs} />
            <div className={styles.taskListContainer}>
                {addingList && (
                    <input
                        autoFocus
                        type="text"
                        onChange={() => { }}
                        onBlur={() => setAddingList(false)}
                        placeholder="Enter task name"
                    />
                )}
                {lists?.map(list =>
                    <TaskList
                        key={list.id}
                        taskList={list}
                        onListDelete={handleDeleteList}
                        onListUpdate={handleUpdateList}
                    />)}
            </div>
        </div>
    );
}

export { TaskBoard };