import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { getValidClassNames } from '../common/helpers/get-valid-class-names.helper';
import styles from './styles.module.scss';
import { MoreVert as MoreVertIcon, CalendarToday as CalendarIcon, FiberManualRecord as FiberManualRecordIcon } from '@mui/icons-material';
import { Chip, Dropdown, IconButton, MenuButton, Typography } from '~/bundles/common/components/components';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TaskModal } from './components/task-modal/task-modal';
import { TaskMenu } from './components/task-menu/task-menu';
type TaskPriority = 'Low' | 'Medium' | 'High';

interface TaskCardProps {
  name: string;
  description: string;
  date: string;
  priority: TaskPriority;
}

const TaskCard: React.FC<TaskCardProps> = ({ name, description, date, priority }) => {
  const [list, setList] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setList(event.target.value as string);
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
        <Typography variant="h6" className={styles.taskTitle}>{name}</Typography>
        <Dropdown>
          <MenuButton>
            <IconButton className={styles.menuBtn}>
              <MoreVertIcon />
            </IconButton>
          </MenuButton>
          <TaskMenu handleEdit={handleModalOpen} />
        </Dropdown>
      </div>
      <p className={styles.taskDescription}>{description}</p>
      <div className={styles.dateRow}>
        <CalendarIcon />
        <span>{date}</span>
      </div>
      <Chip
        label={priority}
        className={getValidClassNames(styles.priority)}
        icon={<FiberManualRecordIcon fontSize='small' className={styles[priority.toLowerCase()]} />} />
      <FormControl fullWidth>
        <InputLabel className={styles.moveToSelect}>Move to:</InputLabel>
        <Select
          value={list}
          label="Move"
          onChange={handleChange}
          className={styles.moveToSelect}
          IconComponent={KeyboardArrowDownIcon}
        >
          <MenuItem value={'Planned'}>Planned</MenuItem>
          <MenuItem value={'In progress'}>In progress</MenuItem>
        </Select>
      </FormControl>

      <TaskModal
        label={"some label"}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export { TaskCard };