import { Button, Loader, Modal, Typography } from '~/bundles/common/components/components';
import styles from './styles.module.scss';
import { Divider } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { HistoryRow } from '../history-row/history-row';
import { useSelector } from '~/bundles/common/hooks/hooks';
import { RootState } from '~/framework/store/store';
import { DataStatus } from '~/framework/enums/data-status.enum';
import { formatDateTime, mapHistoryActivity } from '~/bundles/common/helpers/helpers';
import { Property } from '~/bundles/common/helpers/map-history-activity.helper';

type Properties = {
    isOpen: boolean;
    onClose: () => void;
};
const getLogsState = (state: RootState) => state.logs;
const HistoryModal: React.FC<Properties> = ({
    isOpen,
    onClose,
}) => {
    const { logs, dataStatus } = useSelector(
        (rootState) => getLogsState(rootState),
    );
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
                {dataStatus === DataStatus.PENDING
                    ?
                    <div className={styles.modalContainer}>
                        <Loader />
                    </div>
                    :
                    (<div className={styles.modalContainer}>
                        <ul>
                            {logs.map(activityLog => {
                                let newValue = activityLog.newValue ?? undefined;
                                let oldValue = activityLog.oldValue ?? undefined;
                                if (newValue && oldValue && activityLog.property === Property.DueDate) {
                                    newValue = formatDateTime(newValue, 'Date');
                                    oldValue = formatDateTime(oldValue, 'Date');
                                }
                                return (
                                    <HistoryRow
                                        key={activityLog.id}
                                        actionName={mapHistoryActivity(activityLog.actionType, activityLog.property)}
                                        taskName={activityLog.task.name}
                                        newValue={newValue}
                                        oldValue={oldValue}
                                        date={formatDateTime(activityLog.dateCreated, 'DateTime')} />
                                )
                            })}
                        </ul>
                    </div>)}

            </div>

        </Modal>
    );
};

export { HistoryModal };
