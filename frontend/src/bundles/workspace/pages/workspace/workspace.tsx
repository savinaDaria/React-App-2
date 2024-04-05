import { Notifications } from '~/bundles/common/components/components';
import { useCallback, useDispatch, useEffect, useSelector, useState } from '~/bundles/common/hooks/hooks';
import { boardActions } from '~/bundles/task-board/store/slice';
import { CreateBoardRequest } from '~/bundles/task-board/types/create-board.type';
import { DeleteBoardRequest } from '~/bundles/task-board/types/delete-board.type';
import { UpdateBoardRequest } from '~/bundles/task-board/types/update-board.type';
import { RootState } from '~/framework/store/store';
import styles from './styles.module.scss';
import { WorkspaceHeader } from '../../components/workspace-header/workspace-header';
import { BoardCard } from '~/bundles/task-board/components/board-card/board-card';

const getBoardsState = (state: RootState) => state.boards;

const Workspace: React.FC = () => {
    const dispatch = useDispatch();
    const [addingBoard, setAddingBoard] = useState(false);
    const boards = useSelector(
        (rootState) => getBoardsState(rootState).boards,
    );

    const handleGetBoards = useCallback(() => {
        dispatch(boardActions.getBoards());
    }, [dispatch]);

    const handleDeleteBoard = useCallback((request: DeleteBoardRequest) => {
        dispatch(boardActions.deleteBoard(request));
    }, [dispatch]);

    const handleCreateBoard = useCallback((request: CreateBoardRequest) => {
        dispatch(boardActions.createBoard(request));
    }, [dispatch]);

    const handleUpdateBoard = useCallback((request: UpdateBoardRequest) => {
        dispatch(boardActions.updateBoard(request));
    }, [dispatch]);

    const handleBoardNameBlur = () => {
        setAddingBoard(false)
    };

    useEffect(() => {
        handleGetBoards();
    }, [handleGetBoards])

    return (
        <div>
            <Notifications />
            <WorkspaceHeader
                onCreateBoard={handleCreateBoard}
            />
            <div className={styles.taskBoardContainer}>
                {addingBoard && (
                    <input
                        autoFocus
                        type="text"
                        onChange={() => { }}
                        onBlur={handleBoardNameBlur}
                        placeholder="Enter board name"
                    />
                )}
                <div className={styles.boardContainer}>
                    {boards?.map(board =>
                        <BoardCard
                            key={board.id}
                            board={board}
                            onBoardDelete={handleDeleteBoard}
                            onBoardUpdate={handleUpdateBoard}
                        />)}
                </div>
            </div>
        </div>
    );
}

export { Workspace };