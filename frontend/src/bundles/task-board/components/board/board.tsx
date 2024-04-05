import styles from './styles.module.scss';
import { TaskList } from '~/bundles/task-list/components/list/list';
import { BoardHeader } from '../board-header/board-header';
import { useCallback, useDispatch, useEffect, useParams, useSelector, useState } from '~/bundles/common/hooks/hooks';
import { taskListActions } from '~/bundles/task-list/store/slice';
import { DeleteListRequest } from '~/bundles/task-list/types/delete-list.type';
import { CreateListRequest } from '~/bundles/task-list/types/create-list.type';
import { UpdateListRequest } from '~/bundles/task-list/types/update-list.type';
import { RootState } from '~/framework/store/store';
import { logActions } from '~/bundles/history-modal/store/slice';
import { boardActions } from '../../store/slice';
import { Loader } from '~/bundles/common/components/components';

const getCurrentBoard = (state: RootState) => state.currentBoard;
type Properties = {
    onBoardUpdate?: (updateBody: UpdateListRequest) => void;
    onBoardDelete?: ({ id }: DeleteListRequest) => void;
};
const TaskBoard: React.FC<Properties> = () => {
    const { boardId } = useParams();

    const dispatch = useDispatch();
    const { board: currentBoard } = useSelector(
        (rootState) => getCurrentBoard(rootState),
    );
    useEffect(() => {
        if (!currentBoard && boardId) dispatch(boardActions.getOneBoard({ boardId: parseInt(boardId) }));
    }, [boardId, currentBoard, dispatch])

    
    useEffect(() => {
        return () => {
            dispatch(boardActions.resetCurrentBoard());
        };
    }, [dispatch]);

    const [addingList, setAddingList] = useState(false);

    const handleDeleteList = useCallback((request: DeleteListRequest) => {
        dispatch(taskListActions.deleteList(request));
    }, [dispatch]);

    const handleCreateList = useCallback((request: CreateListRequest) => {
        dispatch(taskListActions.createList(request));
    }, [dispatch]);

    const handleUpdateList = useCallback((request: UpdateListRequest) => {
        dispatch(taskListActions.updateList(request));
    }, [dispatch]);

    const handleGetLogs = useCallback(() => {
        if(boardId) dispatch(logActions.getAllLogs({boardId:parseInt(boardId)}));
    }, [boardId, dispatch]);

    const handleListNameBlur = () => {
        setAddingList(false)
    };

    if (!currentBoard) {
        return <Loader />;
    }
    return (
        <div>
            <BoardHeader
                board={currentBoard}
                onCreateList={handleCreateList}
                onHistoryOpen={handleGetLogs} />
            <div className={styles.taskListContainer}>
                {addingList && (
                    <input
                        autoFocus
                        type="text"
                        onChange={() => { }}
                        onBlur={handleListNameBlur}
                        placeholder="Enter task name"
                    />
                )}
                {currentBoard?.lists.map(list =>
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