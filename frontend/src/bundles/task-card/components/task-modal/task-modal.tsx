import { Button, Calendar, Input, Loader, Modal, Typography, Select } from '~/bundles/common/components/components';
import styles from './styles.module.scss';
import { Divider } from '@mui/material';
import { useCallback, useState, useForm, useDispatch } from '~/bundles/common/hooks/hooks';
import {
    CloseRounded as CloseRoundedIcon,
    Cancel as CancelIcon,
    Save as SaveIcon,
    Edit as EditIcon,
    Adjust as StatusIcon,
    Sell as ProrityIcon,
    CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { Textarea } from '~/bundles/common/components/textarea/textarea';
import { TaskHistory } from '~/bundles/history-modal/components/task-history/task-history';
import { formatDateTime, formatTime, getValidClassNames } from '~/bundles/common/helpers/helpers';
import { taskActions } from '../../store/slice';
import { Task } from '../../types/task.type';
import { TaskPriority } from '~/bundles/common/enums/enums';
import dayjs from 'dayjs';
import { DataStatus } from '~/framework/enums/data-status.enum';

type MenuItemOption = {
    label: string;
    value: number
}
type Properties = {
    isOpen: boolean;
    onClose: () => void;
    moveToOptions: MenuItemOption[];
    task: Task;
    taskDataLoadStatus: typeof DataStatus[keyof typeof DataStatus];
};
type FormInputs = {
    name: string,
    description: string | null,
    listId: number,
    priority: typeof TaskPriority[keyof typeof TaskPriority],
    dueDate: dayjs.Dayjs | null,
    [key: string]: string | number | typeof TaskPriority[keyof typeof TaskPriority] | dayjs.Dayjs | null;

}

const TaskModal: React.FC<Properties> = ({
    isOpen,
    onClose,
    moveToOptions,
    task,
    taskDataLoadStatus
}) => {

    const [isEditMode, setIsEditMode] = useState(false);
    const dispatch = useDispatch();

    const initialState: FormInputs = {
        name: task.name,
        priority: task.priority,
        description: task.description,
        listId: task.listId,
        dueDate: dayjs(task.dueDate),
        status: task.name
    };
    const {
        control,
        getValues,
        formState,
    } = useForm<FormInputs>(
        {
            defaultValues: initialState
        }
    );

    const handleEditMode = useCallback(() => {
        setIsEditMode(!isEditMode);
    }, [isEditMode]);

    const handleTaskUpdateSave = useCallback(() => {
        const allFormValues = getValues();
        const updatePayload: Partial<FormInputs> = {};

        Object.keys(allFormValues).forEach((key) => {

            if (
                key in initialState &&
                allFormValues[key as keyof FormInputs] !== initialState[key]
            ) {
                if (key === 'dueDate' && allFormValues.dueDate && initialState.dueDate) {
                    const newValue = formatTime(allFormValues.dueDate.toISOString());
                    const initialValue= formatTime(initialState.dueDate.toISOString());
                    if (newValue !== initialValue) 
                    updatePayload[key as keyof FormInputs] = allFormValues[key as keyof FormInputs];
                }
                else {

                    updatePayload[key as keyof FormInputs] = allFormValues[key as keyof FormInputs];
                }
            }
        });
        const { dueDate, ...rest } = updatePayload;
        dispatch(taskActions.updateTask({
            id: task.id,
            dueDate: dueDate ? formatTime(dueDate.toISOString()) :undefined,
            ...rest
        }));
        setIsEditMode(false);
    }, []);
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
                            endIcon={<CloseRoundedIcon className={styles.closeIcon} />}
                        />
                    </div>
                </div>
                <Divider />
                {taskDataLoadStatus === DataStatus.FULFILLED
                    ?
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
                                            onClick={handleTaskUpdateSave}
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
                                                <Select
                                                    isDisabled={!Boolean(moveToOptions.length)}
                                                    control={control}
                                                    name={'listId'}
                                                    options={moveToOptions}
                                                    startAdornmentText={"Move to"} />
                                                :
                                                <div className={styles.value}>{task.list?.name}</div>}
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
                                                    control={control}
                                                    className={styles.input}
                                                    name={'dueDate'} />
                                                :
                                                <div className={styles.value}>
                                                    {task.dueDate && formatDateTime(task.dueDate, 'Date')}
                                                </div>}

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
                                                    control={control}
                                                    name={'priority'}
                                                    options={[
                                                        { value: TaskPriority.LOW, label: TaskPriority.LOW },
                                                        { value: TaskPriority.MEDIUM, label: TaskPriority.MEDIUM },
                                                        { value: TaskPriority.HIGH, label: TaskPriority.HIGH }]} />
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
                                            minRows={7}
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
                        {task && <TaskHistory task={task} />}
                    </div>
                    :
                    <div className={getValidClassNames(styles.modalContainer, styles.centered)}>
                        <Loader />
                    </div>
                }
            </div>
        </Modal >
    );
};

export { TaskModal };
