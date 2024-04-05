import { Button, Grid, Typography } from "~/bundles/common/components/components";
import { Add as AddIcon } from '@mui/icons-material';
import styles from './styles.module.scss';
import { getValidClassNames } from "~/bundles/common/helpers/get-valid-class-names.helper";
import { useCallback } from '~/bundles/common/hooks/hooks';
import { CreateBoardRequest } from "~/bundles/task-board/types/create-board.type";
import { DEFAULT_BOARD_PAYLOAD } from "~/bundles/task-board/constants/default.constants";

type Properties = {
  onCreateBoard: ({ name }: CreateBoardRequest) => void;
}
const WorkspaceHeader: React.FC<Properties> = ({ onCreateBoard }) => {
  const handleBoardCreate = useCallback(
    () => onCreateBoard(DEFAULT_BOARD_PAYLOAD),
    [onCreateBoard]
  );
  return (
    <header className={styles.boardHeader}>
      <Typography variant="h3" className={styles.boardTitle}>My Workspace</Typography>
      <Grid className={styles.boardMenu}>
        <Button
          className={getValidClassNames(styles.btn, styles.newList)}
          startIcon={<AddIcon />}
          onClick={handleBoardCreate}
        >Create new board</Button>
      </Grid>
    </header>
  );
}

export { WorkspaceHeader };