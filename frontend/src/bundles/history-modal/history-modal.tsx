import { Button, Modal, Typography } from '~/bundles/common/components/components';
import styles from './styles.module.scss';
import { Divider } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { HistoryRow } from './history-row';

type Properties = {
    isOpen: boolean;
    onClose: () => void;
};

const HistoryModal: React.FC<Properties> = ({
    isOpen,
    onClose,
}) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            className={styles.modalWrapper}
        >
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <Typography variant="h6">History</Typography>
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
                    </ul></div>
            </div>

        </Modal>
    );
};

export { HistoryModal };
