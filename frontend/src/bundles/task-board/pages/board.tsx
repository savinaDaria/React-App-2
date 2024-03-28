import styles from './styles.module.scss';
import { TaskList } from '~/bundles/task-list/list';
import { BoardHeader } from '../components/board-header/board-header';
import { useState } from '~/bundles/common/hooks/hooks';

const TaskBoard: React.FC = () => {
    const [addingList, setAddingTask] = useState(false);

    const handleCreateList = () => {
        //first dispatch creating list
        setAddingTask(true);
      };
    return (
        <div>
            <BoardHeader onCreateList={ handleCreateList} />
            <div className={styles.taskListContainer}>
                {addingList && (
                    <input
                    autoFocus
                        type="text"
                        onChange={()=>{}}
                        onBlur={() => setAddingTask(false)}
                        placeholder="Enter task name"
                    />
                )}
                <TaskList />
                <TaskList />
                <TaskList />
            </div>
        </div>
    );
}

export { TaskBoard };