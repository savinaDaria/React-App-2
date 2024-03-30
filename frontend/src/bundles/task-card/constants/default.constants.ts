import { TaskPriority } from "~/bundles/common/enums/enums";

const DEFAULT_TASK_PAYLOAD = {
    name: 'New task name',
    priority: TaskPriority.LOW,
    description: 'New task description',
    dueDate: new Date(Date.now()).toISOString()
}

export { DEFAULT_TASK_PAYLOAD };