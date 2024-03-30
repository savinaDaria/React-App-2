import { type MenuItemProps } from '@mui/base/MenuItem';
import { Edit as EditIcon, DeleteForever as DeleteIcon } from '@mui/icons-material';

import {
    Menu,
    MenuItem,
    Typography,
} from '~/bundles/common/components/components.js';


import styles from './styles.module.scss';
import { DeleteTaskRequest } from '../../types/delete-task.type';
import { type Task } from '../../types/task.type';
import { useCallback } from '~/bundles/common/hooks/hooks';

type Properties = MenuItemProps & {
    task: Task,
    handleEdit: () => void;
    onTaskDelete: ({ id }: DeleteTaskRequest) => void;
    onTaskUpdate?: () => void;
};

const TaskMenu: React.FC<Properties> = ({
    task,
    handleEdit,
    onTaskDelete
}) => {
    const handleTaskDelete = useCallback(
        () => onTaskDelete({ id: task.id }),
        [onTaskDelete, task.id]
    );
    return (
        <Menu className={styles.menuContainer}>
            <MenuItem
                onClick={handleEdit}
            >
                <EditIcon fontSize="small" />
                <Typography variant="h6">
                    Edit
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleTaskDelete}>
                <DeleteIcon fontSize="small" className={styles.delete} />
                <Typography variant="h6" className={styles.delete}>
                    Delete
                </Typography>
            </MenuItem>
        </Menu>
    );
};

export { TaskMenu };
