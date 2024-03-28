import { Calendar, Button, Typography, Input } from '~/bundles/common/components/components';
import styles from './styles.module.scss';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Cancel as CancelIcon, Save as SaveIcon, Edit as EditIcon, Adjust as StatusIcon, Sell as ProrityIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';
import {  useForm } from '~/bundles/common/hooks/hooks';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Textarea } from '~/bundles/common/components/textarea/textarea';

type Properties = {
    task?: {};
    isEditMode: boolean;
    handleTaskMode: () => void;
};

type FormInputs = {
    name: string,
    description: string,
    listId: string,
    priority: string,
    dueDate: string
}

const TaskPropertiesPanel: React.FC<Properties> = ({
    isEditMode,
    handleTaskMode
}) => {
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.name as keyof FormInputs, event.target.value)
    };
    const {
        control,
        setValue,
        formState,
    } = useForm<FormInputs>(
        {
            defaultValues:{
                name:'Great name',
                priority:'Low'
            }
        }
    );
    return (
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
                    <Typography variant='h3' className={styles.typography}>Task name</Typography>
            }
                {isEditMode
                    ?
                    <div className={styles.buttons}>
                        <Button
                            startIcon={<SaveIcon />}
                            onClick={handleTaskMode}
                            className={styles.editBtn}
                        >Save task</Button>
                        <Button
                            startIcon={<CancelIcon />}
                            onClick={handleTaskMode}
                            className={styles.editBtn}
                        >Cancel changes</Button>
                    </div>
                    :
                    <Button
                        startIcon={<EditIcon />}
                        onClick={handleTaskMode}
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
                                    label="Move"
                                    name='listId'
                                    onChange={handleChange}
                                    className={styles.input}
                                    IconComponent={KeyboardArrowDownIcon}
                                >
                                    <MenuItem value={'Planned'}>Planned</MenuItem>
                                    <MenuItem value={'In progress'}>In progress</MenuItem>
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
                            <div className={styles.value}>Wed, 29 April</div>}

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
                            <div className={styles.value}>Low</div>}
                    </div>
                </div>
            </div>
            <Typography variant='h3'className={styles.typography}>Description</Typography>
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
                    <p>{"Task descriptions should be unambiguous, accurate, factual. Task descriptions should be unambiguous, accurate, factual.\n\nTask descriptions should be unambiguous, accurate, factual.Task descriptions should be unambiguous, accurate, factual. Task descriptions should be unambiguous, accurate, factual.\n\nTask descriptions should be unambiguous, accurate, factual.Task descriptions should be unambiguous, accurate, factual. Task descriptions should be unambiguous, accurate, factual.\n\nTask descriptions should be unambiguous, accurate, factual."}</p>}
            </div>
            </div>
        </div>
    );
};

export { TaskPropertiesPanel };
