import { type MenuItemProps } from '@mui/base/MenuItem';
import { Edit as EditIcon, DeleteForever as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

import {
    Menu,
    MenuItem,
    Typography,
} from '~/bundles/common/components/components.js';


import styles from './styles.module.scss';
import { type List } from '../../types/list.type';
import { useCallback } from '~/bundles/common/hooks/hooks';
import { DeleteListRequest } from '../../types/delete-list.type';

type Properties = MenuItemProps & {
    taskList: List;
    onListDelete: ({ id }: DeleteListRequest) => void;
    onListUpdate: () => void;
    onTaskCreate: ()=> void;
};

const ListMenu: React.FC<Properties> = ({
    taskList,
    onListUpdate,
    onListDelete,
    onTaskCreate
}) => {
    const handleListDelete = useCallback(
        () => onListDelete({ id: taskList.id }),
        [onListDelete, taskList.id]
    );
    return (
        <Menu className={styles.menuContainer}>
            <MenuItem onClick={onListUpdate}>
                <EditIcon fontSize="small" />
                <Typography variant="h6">
                    Edit
                </Typography>
            </MenuItem>
            <MenuItem onClick={onTaskCreate}>
                <AddIcon fontSize="small" />
                <Typography variant="h6">
                    Add new card
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleListDelete}>
                <DeleteIcon fontSize="small" className={styles.delete} />
                <Typography variant="h6" className={styles.delete}>
                    Delete
                </Typography>
            </MenuItem>
        </Menu>
    );
};

export { ListMenu };
