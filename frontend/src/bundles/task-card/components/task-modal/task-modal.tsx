import {  Button, Modal, Typography } from '~/bundles/common/components/components';
import styles from './styles.module.scss';
import { Divider} from '@mui/material';
import { CloseRounded} from '@mui/icons-material';
import { HistoryRow } from '~/bundles/history-modal/history-row';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { TaskPropertiesPanel } from './task-properties-panel';

type Properties = {
    label: string;
    isOpen: boolean;
    onClose: () => void;
};

const TaskModal: React.FC<Properties> = ({
    isOpen,
    onClose,
}) => {
    
    const [isEditMode, setIsEditMode] = useState(false);
   
    const handleEditMode = useCallback(() => {
        setIsEditMode(!isEditMode);
    }, [isEditMode]);
    return (
        <Modal
            headerLabel={""}
            open={isOpen}
            onClose={onClose}
            className={styles.modal}
        >
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <div className={styles.closeButtonWrapper}>
                        <Button
                            onClick={onClose}
                            className={styles.iconButton}
                            label=""
                            variant="outlined"
                            endIcon={<CloseRounded className={styles.closeIcon} />}
                        />
                    </div>
                </div>
                <Divider />
                <div className={styles.modalContainer}>
                    <TaskPropertiesPanel
                        isEditMode={isEditMode}
                        handleTaskMode={handleEditMode} />
                    <div className={styles.taskHistory}>
                        <Typography variant='h3' className={styles.typography}>Activity</Typography>
                        <ul>
                            <HistoryRow
                                actionName={'added'}
                                taskName={'Document Review'}
                                newValue={'Planned'}
                                date={'Mar 5 at 5:11 pm'} />
                            <HistoryRow
                                actionName={'renamed'}
                                taskName={'Dev review'}
                                oldValue={'Dev check'}
                                newValue={'Dev docs'}
                                date={'Mar 5 at 5:10 pm'} />
                            <HistoryRow
                                actionName={'added'}
                                taskName={'Document Review'}
                                newValue={'Planned'}
                                date={'Mar 5 at 5:10 pm'} />
                            <HistoryRow
                                actionName={'added'}
                                taskName={'Document Review'}
                                newValue={'Planned'}
                                date={'Mar 5 at 5:10 pm'} />
                            <HistoryRow
                                actionName={'renamed'}
                                taskName={'Dev review'}
                                oldValue={'Dev check'}
                                newValue={'Dev docs'}
                                date={'Mar 5 at 5:10 pm'} />
                            <HistoryRow
                                actionName={'added'}
                                taskName={'Document Review'}
                                newValue={'Planned'}
                                date={'Mar 5 at 5:10 pm'} />
                            <HistoryRow
                                actionName={'added'}
                                taskName={'Document Review'}
                                newValue={'Planned'}
                                date={'Mar 5 at 5:10 pm'} />
                            <HistoryRow
                                actionName={'renamed'}
                                taskName={'Dev review'}
                                oldValue={'Dev check'}
                                newValue={'Dev docs'}
                                date={'Mar 5 at 5:10 pm'} />
                            <HistoryRow
                                actionName={'added'}
                                taskName={'Document Review'}
                                newValue={'Planned'}
                                date={'Mar 5 at 5:10 pm'} />
                            <HistoryRow
                                actionName={'added'}
                                taskName={'Document Review'}
                                newValue={'Planned'}
                                date={'Mar 5 at 5:10 pm'} />
                            <HistoryRow
                                actionName={'renamed'}
                                taskName={'Dev review'}
                                oldValue={'Dev check'}
                                newValue={'Dev docs'}
                                date={'Mar 5 at 5:10 pm'} />
                            <HistoryRow
                                actionName={'added'}
                                taskName={'Document Review'}
                                newValue={'Planned'}
                                date={'Mar 5 at 5:34 pm'} />
                        </ul>
                    </div>
                </div>
            </div>
        </Modal >
    );
};

export { TaskModal };
