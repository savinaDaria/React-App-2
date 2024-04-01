import { Typography } from '~/bundles/common/components/components';
import styles from './styles.module.scss';
import { HistoryRow } from '../history-row/history-row';
import { formatDateTime, mapHistoryActivity } from '~/bundles/common/helpers/helpers';
import { Task } from '~/bundles/task-card/types/task.type';
import { Property } from '~/bundles/common/helpers/map-history-activity.helper';

type Properties = {
    task: Task
};

const TaskHistory: React.FC<Properties> = ({ task }) => {
    const { logs, name } = task;
    return (

        <div className={styles.taskHistory}>
            <Typography variant='h3' className={styles.typography}>Activity</Typography>
            <div className={styles.historyContainer}>
                <ul>
                    {logs.map(activityLog => {
                        let newValue=activityLog.newValue ?? undefined;
                        let oldValue=activityLog.oldValue ?? undefined;
                        if(newValue && oldValue && activityLog.property===Property.DueDate){
                            newValue =formatDateTime(newValue,'Date');
                            oldValue=formatDateTime(oldValue,'Date');
                        }
                        return (
                            <HistoryRow
                                key={activityLog.id}
                                actionName={mapHistoryActivity(activityLog.actionType, activityLog.property)}
                                taskName={name}
                                newValue={newValue}
                                oldValue={oldValue}
                                date={formatDateTime(activityLog.dateCreated, 'DateTime')} />
                        )
                    })}
                </ul>
            </div>
        </div>
    );
};

export { TaskHistory };
