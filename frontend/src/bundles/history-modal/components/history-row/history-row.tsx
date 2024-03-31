import styles from './styles.module.scss';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
type Properties = {
    actionName: string;
    taskName: string;
    date: string;
    oldValue?: string;
    newValue?: string;
};

const HistoryRow: React.FC<Properties> = ({
    actionName,
    taskName,
    date,
    oldValue,
    newValue
}) => {
    return (
        <li>You {actionName}
            <span className={styles.taskSpan}> <RadioButtonCheckedIcon className={styles.circleIcon}/> {taskName}</span>
            {oldValue &&
                <span> from
                    <span className={styles.valueSpan}> {oldValue}</span>
                </span>}
            {newValue &&
                <span> to
                    <span className={styles.valueSpan}> {newValue}</span>
                </span>}
            <span className={styles.dateSpan}>{date}</span>
        </li>
    );
};

export { HistoryRow };
