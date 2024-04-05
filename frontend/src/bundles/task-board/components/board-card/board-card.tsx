import { NavLink } from "react-router-dom";
import { Board } from "../../types/board.type";
import { DeleteBoardRequest } from "../../types/delete-board.type";
import { UpdateBoardRequest } from "../../types/update-board.type";
import styles from './styles.module.scss';
import { Dropdown, MenuButton } from "~/bundles/common/components/components";
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { BoardMenu } from "../board-menu/board-menu";
import { useCallback, useEffect, useRef, useState } from "~/bundles/common/hooks/hooks";
import { notification } from '~/framework/services/services';
import { TextField } from "@mui/material";
import { getValidClassNames } from "~/bundles/common/helpers/helpers";
import { BoardEditValidationSchema } from "../../validation-schemas/validation-schemas";

interface BoardCardProps {
    board: Board;
    onBoardUpdate: (updateBody: UpdateBoardRequest) => void;
    onBoardDelete: ({ id }: DeleteBoardRequest) => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ board, onBoardDelete, onBoardUpdate }) => {

    const [editedName, setEditedName] = useState(board.name);
    const [isEditInputActive, setIsEditInputActive] = useState(board.recentlyCreated);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        isEditInputActive && inputRef.current?.focus();
    }, [isEditInputActive]);

    const handleInputNameFocus = useCallback(() => {
        setIsEditInputActive(true);
    }, []);
    
    const handleInputNameBlur = useCallback(() => {
        const { error } = BoardEditValidationSchema.validate({ name: editedName });
        if (!error) {
            const updatePayload = {
                id: board.id,
                name: editedName
            };
            onBoardUpdate(updatePayload);
        }
        else {
            setEditedName(board.name)
            notification.ERROR(error.message);
        }
        setIsEditInputActive(false);
    }, [board.id, board.name, editedName, onBoardUpdate]);

    return (
        <div className={styles.boardCard}>
            <div className={styles.boardLink}>
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
                    (<NavLink className={styles.boardLink} to={`/boards/${board.id}`}>{board.name}</NavLink>)
            }
            </div>
            
            <Dropdown>
                <MenuButton className={styles.menuBtn}>
                    <MoreVertIcon />
                </MenuButton>
                <BoardMenu
                    onBoardDelete={onBoardDelete}
                    onBoardUpdate={handleInputNameFocus}
                    board={board}
                />
            </Dropdown>
        </div>
    );
}

export { BoardCard };