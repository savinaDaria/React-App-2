import styles from './styles.module.scss';
import { TaskCard } from "~/bundles/task-card/task";
import { MoreVert as MoreVertIcon, Add as AddIcon } from '@mui/icons-material';
import { Button, Dropdown, Grid, IconButton, MenuButton, Typography } from '~/bundles/common/components/components';
import { ListMenu } from './components/list-menu';
import { useCallback} from '~/bundles/common/hooks/hooks';

const TaskList: React.FC = () => {
    const handleModalOpen = useCallback(() => {
      
      }, []);

    return (
        <Grid className={styles.list}>
            <div className={styles.listHeader}>
                <Typography variant="h6" className={styles.listTitle}>To Do</Typography>
                <div>
                    <span className={styles.taskCount}>45</span>
                    <Dropdown>
                        <MenuButton>
                            <IconButton className={styles.menuBtn}>
                                <MoreVertIcon />
                            </IconButton>
                        </MenuButton>
                        <ListMenu handleEdit={handleModalOpen} />
                    </Dropdown>
                </div>
            </div>
            <Button
                className={styles.addCardBtn}
                startIcon={<AddIcon />}
            >Add new card</Button>
            <div className={styles.taskContainer}>
                <TaskCard
                    name="Task name"
                    description="Task descriptions should be unambiguous, accurate, factual."
                    date="Wed, 19 Apr"
                    priority="High"
                />
                <TaskCard
                    name="Task name"
                    description="Task descriptions should be unambiguous, accurate, factual."
                    date="Wed, 19 Apr"
                    priority="Medium"
                />
                <TaskCard
                    name="Task name"
                    description="Task descriptions should be unambiguous, accurate, factual."
                    date="Wed, 19 Apr"
                    priority="Low"
                />
                <TaskCard
                    name="Task name"
                    description="Task descriptions should be unambiguous, accurate, factual."
                    date="Wed, 19 Apr"
                    priority="Medium"
                />
            </div>
        </Grid>
    );
}

export { TaskList };