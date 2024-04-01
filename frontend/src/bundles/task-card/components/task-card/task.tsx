import styles from './styles.module.scss';
import { MoreVert as MoreVertIcon, CalendarToday as CalendarIcon, FiberManualRecord as FiberManualRecordIcon } from '@mui/icons-material';
import { Chip, Dropdown, MenuButton, Typography, Select } from '~/bundles/common/components/components';
import { useCallback, useEffect, useForm, useSelector, useState } from '~/bundles/common/hooks/hooks';
import { TaskModal } from '../task-modal/task-modal';
import { TaskMenu } from '../task-menu/task-menu';
import { Task } from '../../types/task.type';
import { DeleteTaskRequest } from '../../types/delete-task.type';
import { MoveTaskRequest } from '../../types/move-task.type';
import { formatDateTime, getValidClassNames } from '../../../common/helpers/helpers';
import { GetTaskRequest } from '../../types/get-task.type';
import { RootState } from '~/framework/store/store';

type MenuItemOption = {
  label: string;
  value: number
}

type FormInputs = {
  listId: number | '';
}
interface TaskCardProps {
  task: Task,
  onTaskDelete: ({ id }: DeleteTaskRequest) => void;
  onTaskUpdate?: () => void;
  onTaskView: (request: GetTaskRequest) => void;
  onTaskClose: () => void;
  onMoveTask: (updateBody: MoveTaskRequest) => void;
  moveToOptions: MenuItemOption[]
}
const getCurrentTaskState = (state: RootState) => state.currentTask;

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onTaskDelete,
  onMoveTask,
  onTaskView,
  onTaskClose,
  moveToOptions
}) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const { task: currentTask, dataStatus } = useSelector(
    (rootState) => getCurrentTaskState(rootState),
  );
  const { control, watch } = useForm<FormInputs>(
    {
      defaultValues: {
        listId: ''
      }
    }
  );
  const listId = watch('listId');

  useEffect(() => {
    if (typeof listId === 'number')
      onMoveTask({ id: task.id, listId });
  }, [listId]);

  const handleModalClose = useCallback(() => {
    setisModalOpen(false);
    onTaskClose();
  }, []);

  const handleModalOpen = useCallback(() => {
    onTaskView({ id: task.id });
    setisModalOpen(true);
  }, []);


  return (
    <div className={styles.taskCard}>
      <div className={styles.cardHeader}>
        <Typography variant="h6" className={getValidClassNames('title', styles.clickableTitle)} onClick={handleModalOpen}>{task.name}</Typography>
        <Dropdown>
          <MenuButton className={styles.menuBtn}>
            <MoreVertIcon />
          </MenuButton>
          <TaskMenu
            handleEdit={handleModalOpen}
            task={task}
            onTaskDelete={onTaskDelete} />
        </Dropdown>
      </div>
      <p className={styles.taskDescription}>{task.description}</p>
      <div className={styles.dateRow}>
        <CalendarIcon />
        <span>{task.dueDate && formatDateTime(task.dueDate, 'Date')}</span>
      </div>
      <Chip
        label={task.priority}
        icon={<FiberManualRecordIcon fontSize='small' className={styles[task.priority.toLowerCase()]} />} />
      <Select
      isDisabled={!Boolean(moveToOptions.length)}
        control={control}
        name={'listId'}
        options={moveToOptions}
        placeholder={''}
        startAdornmentText={"Move to"} />

      {currentTask &&
        <TaskModal
          task={currentTask}
          taskDataLoadStatus={dataStatus}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          moveToOptions={moveToOptions}
        />}
    </div>
  );
}

export { TaskCard };