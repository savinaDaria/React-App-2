import { TaskPriority } from "~/bundles/common/enums/enums";
import { formatTime } from "~/bundles/common/helpers/helpers";



const DEFAULT_TASK_PAYLOAD = {
    name: 'New task name',
    priority: TaskPriority.LOW,
    description: 'New task description',
    dueDate: formatTime(new Date().toISOString())
}

export { DEFAULT_TASK_PAYLOAD };