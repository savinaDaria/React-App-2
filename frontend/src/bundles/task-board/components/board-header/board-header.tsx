import { Button, Grid, Typography } from "~/bundles/common/components/components";
import { History as HistoryIcon, Add as AddIcon } from '@mui/icons-material';
import styles from './styles.module.scss';
import { getValidClassNames } from "~/bundles/common/helpers/get-valid-class-names.helper";
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { HistoryModal } from "~/bundles/history-modal/history-modal";
import { CreateListRequest } from "~/bundles/task-list/types/create-list.type";
import { DEFAULT_TASK_LIST_PAYLOAD } from "~/bundles/task-list/constants/default.constants";

type Properties = {
  onCreateList: ({ name }: CreateListRequest) => void;
}
const BoardHeader: React.FC<Properties> = ({ onCreateList }) => {
  const [isHistoryModalOpen, setisHistoryModalOpen] = useState(false);
  const handleHistoryModalClose = useCallback(() => {
    setisHistoryModalOpen(false);
  }, []);

  const handleHistoryModalOpen = useCallback(() => {
    setisHistoryModalOpen(true);
  }, []);

  const handleListCreate = useCallback(
    () => onCreateList(DEFAULT_TASK_LIST_PAYLOAD),
    [onCreateList]
  );
  return (
    <header className={styles.boardHeader}>
      <Typography variant="h3" className={styles.boardTitle}>My Task Board</Typography>
      <Grid className={styles.boardMenu}>
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