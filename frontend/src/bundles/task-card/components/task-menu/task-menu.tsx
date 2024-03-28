import { type MenuItemProps } from '@mui/base/MenuItem';
import { Edit as EditIcon, DeleteForever as DeleteIcon } from '@mui/icons-material';

import {
    Menu,
    MenuItem,
    Typography,
} from '~/bundles/common/components/components.js';


import styles from './styles.module.scss';

type Properties = MenuItemProps & {
    handleEdit: () => void;
};

const TaskMenu: React.FC<Properties> = ({
    handleEdit
}) => {
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
            <MenuItem onClick={handleEdit}>
                <DeleteIcon fontSize="small" className={styles.delete} />
                <Typography variant="h6" className={styles.delete}>
                    Delete
                </Typography>
            </MenuItem>
        </Menu>
    );
};

export { TaskMenu };
