import { type MenuItemProps } from '@mui/base/MenuItem';
import { Edit as EditIcon, DeleteForever as DeleteIcon } from '@mui/icons-material';

import {
    Menu,
    MenuItem,
    Typography,
} from '~/bundles/common/components/components.js';


import styles from './styles.module.scss';
import { type Board } from '../../types/board.type';
import { useCallback } from '~/bundles/common/hooks/hooks';
import { DeleteBoardRequest } from '../../types/delete-board.type';

type Properties = MenuItemProps & {
    board: Board;
    onBoardDelete: ({ id }: DeleteBoardRequest) => void;
    onBoardUpdate: () => void;
};

const BoardMenu: React.FC<Properties> = ({
    board,
    onBoardUpdate,
    onBoardDelete
}) => {
    const handleBoardDelete = useCallback(
        () => onBoardDelete({ id: board.id }),
        [board.id, onBoardDelete]
    );
    return (
        <Menu className={styles.menuContainer}>
            <MenuItem onClick={onBoardUpdate}>
                <EditIcon fontSize="small" />
                <Typography variant="h6">
                    Edit
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleBoardDelete}>
                <DeleteIcon fontSize="small" className={styles.delete} />
                <Typography variant="h6" className={styles.delete}>
                    Delete
                </Typography>
            </MenuItem>
        </Menu>
    );
};

export { BoardMenu };
