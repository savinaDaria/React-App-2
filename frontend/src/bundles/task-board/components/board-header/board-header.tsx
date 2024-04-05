import { Button, Grid, Typography } from "~/bundles/common/components/components";
import { History as HistoryIcon, Add as AddIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import styles from './styles.module.scss';
import { getValidClassNames } from "~/bundles/common/helpers/get-valid-class-names.helper";
import { useCallback, useNavigate, useState } from '~/bundles/common/hooks/hooks';
import { HistoryModal } from "~/bundles/history-modal/components/board-history/board-history";
import { CreateListRequest } from "~/bundles/task-list/types/create-list.type";
import { DEFAULT_TASK_LIST_PAYLOAD } from "~/bundles/task-list/constants/default.constants";
import { Board } from "../../types/board.type";
import { AppRoute } from "~/bundles/common/enums/enums";

type Properties = {
  board: Board,
  onCreateList: ({ name }: CreateListRequest) => void;
  onHistoryOpen: () => void;
}

const BoardHeader: React.FC<Properties> = ({ onCreateList, onHistoryOpen, board }) => {
  const [isHistoryModalOpen, setisHistoryModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleHistoryModalClose = useCallback(() => {
    setisHistoryModalOpen(false);
  }, []);

  const handleHistoryModalOpen = useCallback(() => {
    onHistoryOpen();
    setisHistoryModalOpen(true);
  }, [onHistoryOpen]);

  const handleListCreate = useCallback(
    () => onCreateList({ ...DEFAULT_TASK_LIST_PAYLOAD, boardId: board.id }),
    [board.id, onCreateList]
  );
  return (
    <header className={styles.boardHeader}>
      <Typography variant="h3" className={styles.boardTitle}>{board.name}</Typography>
      <Grid className={styles.boardMenu}>
      <Button
          className={getValidClassNames(styles.btn, styles.newList)}
          startIcon={<ArrowBackIcon />}
          onClick={() => { navigate(AppRoute.ROOT) }}>My Workspace
          </Button>
        <Button
          className={getValidClassNames(styles.btn, styles.history)}
          startIcon={<HistoryIcon />}
          onClick={handleHistoryModalOpen}
        >History</Button>
        <Button
          className={getValidClassNames(styles.btn, styles.newList)}
          startIcon={<AddIcon />}
          onClick={handleListCreate}
        >Create new list</Button>
      </Grid>
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={handleHistoryModalClose}
      />
    </header>
  );
}

export { BoardHeader };