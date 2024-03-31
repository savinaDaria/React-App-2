import { Typography } from '~/bundles/common/components/components';
import styles from './styles.module.scss';
import { HistoryRow } from '../history-row/history-row';
import { formatDateTime, mapHistoryActivity } from '~/bundles/common/helpers/helpers';
import { Task } from '~/bundles/task-card/types/task.type';

type Properties = {
    task:Task
};

const TaskHistory: React.FC<Properties> = ({task}) => {
    const {logs, name}=task;
    return (

        <div className={styles.taskHistory}>
            <Typography variant='h3' className={styles.typography}>Activity</Typography>
            <ul>
            {logs.map(activityLog => (
                                <HistoryRow
                                    key={activityLog.id}
                                    actionName={mapHistoryActivity(activityLog.actionType,activityLog.property)}
                                    taskName={name}
                                    newValue={activityLog.newValue ?? undefined}
                                    oldValue={activityLog.oldValue ?? undefined}
                                    date={formatDateTime(activityLog.dateCreated,'DateTime')} />
                            ))}
            </ul>
        </div>
    );
};

export { TaskHistory };
