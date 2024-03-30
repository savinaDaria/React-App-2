import { Button, Calendar, Input, Modal, Typography } from '~/bundles/common/components/components';
import styles from './styles.module.scss';
import { Divider } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { HistoryRow } from '~/bundles/history-modal/history-row';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Cancel as CancelIcon, Save as SaveIcon, Edit as EditIcon, Adjust as StatusIcon, Sell as ProrityIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';
import { useForm } from '~/bundles/common/hooks/hooks';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Textarea } from '~/bundles/common/components/textarea/textarea';
import { Task } from '../../types/task.type';
type MenuItemOption = {
    label: string;
    value: string
}
type Properties = {
    task: Task;
    isOpen: boolean;
    onClose: () => void;
    moveToOptions: MenuItemOption[];
};
type FormInputs = {
    name: string,
    description: string,
    listId: number,
    priority: string,
    dueDate: string
}

const TaskModal: React.FC<Properties> = ({
    task,
    isOpen,
    onClose,
    moveToOptions
}) => {

    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditMode = useCallback(() => {
        setIsEditMode(!isEditMode);
    }, [isEditMode]);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.name as keyof FormInputs, event.target.value)
    };
    const {
        control,
        setValue,
        formState,
    } = useForm<FormInputs>(
        {
            defaultValues: {
                name: task.name,
                priority: task.priority,
                description: task.description,
                listId: task.listId,
                dueDate: task.dueDate
            }
        }
    );
    return (
        <Modal
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
                    <div className={styles.taskData}>
                        <div className={styles.taskHeader}>
                            {isEditMode
                                ?
                                <Input
                                    className={styles.inputName}
                                    control={control}
                                    errors={formState.errors}
                                    placeholder="Task name"
                                    name="name"
                                />
                                :
                                <Typography variant='h3' className={styles.typography}>{task.name}</Typography>
                            }
                            {isEditMode
                                ?
                                <div className={styles.buttons}>
                                    <Button
                                        startIcon={<SaveIcon />}
                                        onClick={handleEditMode}
                                        className={styles.editBtn}
                                    >Save task</Button>
                                    <Button
                                        startIcon={<CancelIcon />}
                                        onClick={handleEditMode}
                                        className={styles.editBtn}
                                    >Cancel changes</Button>
                                </div>
                                :
                                <Button
                                    startIcon={<EditIcon />}
                                    onClick={handleEditMode}
                                    className={styles.editBtn}
                                >Edit task</Button>
                            }
                        </div>
                        <div className={styles.taskPropContainer}>

                            <div className={styles.taskProperties}>
                                <div className={styles.infoItem}>
                                    <span className={styles.icon}>
                                        <StatusIcon />
                                    </span>
                                    <div className={styles.text}>
                                        <div className={styles.label}>Status</div>
                                        {isEditMode
                                            ?
                                            <FormControl>
                                                <InputLabel className={styles.input}>Move to:</InputLabel>
                                                <Select
                                                    disabled={!moveToOptions.length}
                                                    label="Move"
                                                    name='listId'
                                                    onChange={handleChange}
                                                    className={styles.input}
                                                    IconComponent={KeyboardArrowDownIcon}
                                                >
                                                    {moveToOptions.map(option => (
                                                        <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            :
                                            <div className={styles.value}>In progress</div>}
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.icon}>
                                        <CalendarIcon />
                                    </span>
                                    <div className={styles.text}>
                                        <div className={styles.label}>Due date</div>
                                        {isEditMode
                                            ?
                                            <Calendar
                                                label={""}
                                                className={styles.input} />
                                            :
                                            <div className={styles.value}>{task.dueDate}</div>}

                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.icon}>
                                        <ProrityIcon />
                                    </span>
                                    <div className={styles.text}>
                                        <div className={styles.label}>Priority</div>
                                        {isEditMode
                                            ?
                                            <Select
                                                label="priority"
                                                onChange={handleChange}
                                                className={styles.input}
                                                IconComponent={KeyboardArrowDownIcon}
                                            >
                                                <MenuItem value={'Planned'}>Low</MenuItem>
                                                <MenuItem value={'In progress'}>High</MenuItem>
                                            </Select>
                                            :
                                            <div className={styles.value}>{task.priority}</div>}
                                    </div>
                                </div>
                            </div>
                            <Typography variant='h3' className={styles.typography}>Description</Typography>
                            <div className={styles.taskDescription}>
                                {isEditMode
                                    ?
                                    <Textarea
                                        minRows={4}
                                        maxRows={100}
                                        control={control}
                                        errors={formState.errors}
                                        className={styles.textInput}
                                        placeholder="Text"
                                        name={'description'}
                                    />
                                    :
                                    <p>{task.description}</p>}
                            </div>
                        </div>
                    </div>
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
