import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { getValidClassNames } from '../common/helpers/get-valid-class-names.helper';
import styles from './styles.module.scss';
import { MoreVert as MoreVertIcon, CalendarToday as CalendarIcon, FiberManualRecord as FiberManualRecordIcon } from '@mui/icons-material';
import { Chip, Dropdown, MenuButton, Typography } from '~/bundles/common/components/components';
import { useCallback, useEffect, useState } from '~/bundles/common/hooks/hooks';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TaskModal } from './components/task-modal/task-modal';
import { TaskMenu } from './components/task-menu/task-menu';
import { Task } from './types/task.type';
import { DeleteTaskRequest } from './types/delete-task.type';
import { MoveTaskRequest } from './types/move-task.type';

type MenuItemOption = {
  label: string;
  value: string
}
interface TaskCardProps {
  task: Task,
  onTaskDelete: ({ id }: DeleteTaskRequest) => void;
  onTaskUpdate?: () => void;
  onMoveTask: (updateBody: MoveTaskRequest) => void;
  moveToOptions: MenuItemOption[]
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onTaskDelete,
  onMoveTask,
  moveToOptions
}) => {
  const [list, setList] = useState('');

  useEffect(() => {
    if(parseInt(list)!==task.listId && parseInt(list)){
      onMoveTask({ id: task.id, listId: parseInt(list)});
    }
  }, [list, onMoveTask, task.id, task.listId]);

  const handleChange = (event: SelectChangeEvent) => {
    setList(event.target.value);    
  };

  const [isModalOpen, setisModalOpen] = useState(false);

  const handleModalClose = useCallback(() => {
    setisModalOpen(false);
  }, []);

  const handleModalOpen = useCallback(() => {
    setisModalOpen(true);
  }, []);
  return (
    <div className={styles.taskCard}>
      <div className={styles.cardHeader}>
        <Typography variant="h6" className={styles.taskTitle}>{task.name}</Typography>
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
        <span>{task.dueDate}</span>
      </div>
      <Chip
        label={task.priority}
        className={getValidClassNames(styles.priority)}
        icon={<FiberManualRecordIcon fontSize='small' className={styles[task.priority.toLowerCase()]} />} />
      <FormControl fullWidth>
        <InputLabel className={styles.moveToSelect}>Move to:</InputLabel>
        <Select
          disabled={!moveToOptions.length}
          value={list}
          label="Move"
          onChange={handleChange}
          className={styles.moveToSelect}
          IconComponent={KeyboardArrowDownIcon}
        >
          {moveToOptions.map(option => (
            <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TaskModal
        task={task}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        moveToOptions={moveToOptions}
      />
    </div>
  );
}

export { TaskCard };