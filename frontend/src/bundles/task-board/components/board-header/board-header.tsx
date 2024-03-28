import { Button, Grid, Typography } from "~/bundles/common/components/components";
import { History as HistoryIcon, Add as AddIcon } from '@mui/icons-material';
import styles from './styles.module.scss';
import { getValidClassNames } from "~/bundles/common/helpers/get-valid-class-names.helper";
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { HistoryModal } from "~/bundles/history-modal/history-modal";

type Properties={
  onCreateList:()=>void
}
const BoardHeader: React.FC<Properties> = ({onCreateList}) => {
    const [isHistoryModalOpen, setisHistoryModalOpen] = useState(false);
    const handleHistoryModalClose = useCallback(() => {
      setisHistoryModalOpen(false);
    }, []);
  
    const handleHistoryModalOpen = useCallback(() => {
      setisHistoryModalOpen(true);
    }, []);

    return (
        <header className={styles.boardHeader}>
            <Typography variant="h3" className={styles.boardTitle}>My Task Board</Typography>
            <Grid className={styles.boardMenu}>
                <Button
                    className={getValidClassNames(styles.btn,styles.history)}
                    startIcon={<HistoryIcon />}
                    onClick={handleHistoryModalOpen}
                >History</Button>
                <Button
                    className={getValidClassNames(styles.btn,styles.newList)}
                    startIcon={<AddIcon />}
                    onClick={onCreateList}
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