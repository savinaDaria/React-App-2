import styles from './styles.module.scss';
import { TaskCard } from "~/bundles/task-card/components/task-card/task";
import { MoreVert as MoreVertIcon, Add as AddIcon } from '@mui/icons-material';
import { Button, Dropdown, Grid,  MenuButton, Typography } from '~/bundles/common/components/components';
import { ListMenu } from '../list-menu/list-menu';
import { type List } from '../../types/list.type';
import { DeleteListRequest } from '../../types/delete-list.type';
import { useCallback, useDispatch, useEffect, useRef, useSelector, useState } from '~/bundles/common/hooks/hooks';
import { UpdateListRequest } from '../../types/update-list.type';
import { TextField } from '@mui/material';
import { getValidClassNames } from '~/bundles/common/helpers/helpers';
import { taskActions } from '~/bundles/task-card/store/slice';
import { CreateTaskRequest } from '~/bundles/task-card/types/create-task.type';
import { DeleteTaskRequest } from '~/bundles/task-card/types/delete-task.type';
import { GetTaskRequest } from '~/bundles/task-card/types/get-task.type';
import { DEFAULT_TASK_PAYLOAD } from '~/bundles/task-card/constants/default.constants';
import { RootState } from '~/framework/store/store';
import { MoveTaskRequest } from '~/bundles/task-card/types/move-task.type';
import { taskListActions } from '../../store/slice';
import { ListEditValidationSchema } from '../../validation-schemas/validation-schemas';
import { notification } from '~/framework/services/services';

type Properties = {
    taskList: List;
    onListUpdate: (updateBody: UpdateListRequest) => void;
    onListDelete: ({ id }: DeleteListRequest) => void;
};
const getListsState = (state: RootState) => state.taskLists;

const TaskList: React.FC<Properties> = ({
    taskList,
    onListUpdate,
    onListDelete
}) => {
    const [editedName, setEditedName] = useState(taskList.name);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isEditInputActive, setIsEditInputActive] = useState(taskList.recentlyCreated);

    const lists = useSelector(
        (rootState) => getListsState(rootState).taskLists,
    );
    const moveToOptions = lists.filter(list => list.id !== taskList.id).map(list => ({
        label: list.name,
        value: list.id,
    }));
    useEffect(() => {
        isEditInputActive && inputRef.current?.focus();
    }, [isEditInputActive]);

    const handleInputNameFocus = useCallback(() => {
        setIsEditInputActive(true);
    }, []);

    const handleInputNameBlur = useCallback(() => {
        const { error } = ListEditValidationSchema.validate({name: editedName});
        if (!error) {
            const updatePayload = {
                id: taskList.id,
                name: editedName
            };
            onListUpdate(updatePayload);
        }
        else{
            setEditedName(taskList.name)
            notification.ERROR(error.message);
        }
        setIsEditInputActive(false);
    }, [editedName,onListUpdate, taskList.id]);

    const dispatch = useDispatch();

    const handleGetTask = useCallback((request: GetTaskRequest) => {
        dispatch(taskActions.getTask(request));
    }, [dispatch]);

    const handleDeleteTask = useCallback((request: DeleteTaskRequest) => {
        dispatch(taskActions.deleteTask(request));
    }, [dispatch]);

    const handleResetTask = useCallback(() => {
        dispatch(taskActions.resetState());
        dispatch(taskListActions.getLists());
    }, [dispatch]);

    const handleCreateTask = useCallback((request: CreateTaskRequest) => {
        dispatch(taskActions.createTask(request));
    }, [dispatch]);

    const handleMoveTask = useCallback((request: MoveTaskRequest) => {
        dispatch(taskActions.moveTask(request));
    }, [dispatch]);

    const onTaskCreate = useCallback(
        () => handleCreateTask({
            listId: taskList.id,
            ...DEFAULT_TASK_PAYLOAD
        }),
        [handleCreateTask, taskList.id]
    );

    return (
        <Grid className={styles.list}>
            <div className={styles.listHeader}>
                {
                    isEditInputActive
                        ?
                        <TextField
                            inputRef={inputRef}
                            value={editedName}
                            onBlur={handleInputNameBlur}
                            onChange={(e) => setEditedName(e.target.value)}
                            className={getValidClassNames(styles.inputName, 'title')}
                        />
                        :
                        (<Typography variant="h6" className={'title'}>
                            {editedName}
                        </Typography>)
                }
                <div className={styles.flexRow}>
                    <div className={styles.taskCount}>
                        {taskList.tasks.length}
                    </div>
                    <Dropdown>
                        <MenuButton className={styles.menuBtn}>
                            <MoreVertIcon />
                        </MenuButton>
                        <ListMenu
                            onListDelete={onListDelete}
                            onListUpdate={handleInputNameFocus}
                            onTaskCreate={onTaskCreate}
                            taskList={taskList}
                        />
                    </Dropdown>
                </div>
            </div>
            <Button
                className={styles.addCardBtn}
                startIcon={<AddIcon />}
                onClick={onTaskCreate}
            >Add new card</Button>
            <div className={styles.taskContainer}>
                {taskList.tasks.map(task => (
                    <TaskCard
                        task={task}
                        key={task.id}
                        onTaskDelete={handleDeleteTask}
                        onTaskView={handleGetTask}
                        onTaskClose={handleResetTask}
                        moveToOptions={moveToOptions}
                        onMoveTask={handleMoveTask}
                    />))}
            </div>
        </Grid>
    );
}

export { TaskList };