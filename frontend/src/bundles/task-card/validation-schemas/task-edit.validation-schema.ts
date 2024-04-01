import joi from 'joi';

import {
    TaskEditValidationMessages,
    TaskEditValidationRules,
} from './validation-enums/enums.js';
import { UpdateTaskForm } from '../types/update-task.type.js';
import { TaskPriority } from '~/bundles/common/enums/task-priority.enum.js';
const TaskEditValidationSchema = joi.object<UpdateTaskForm, true>({
    name: joi
        .string()
        .trim()
        .min(TaskEditValidationRules.MIN_NAME_LENGTH)
        .max(TaskEditValidationRules.MAX_NAME_LENGTH)
        .messages({
            'string.empty': TaskEditValidationMessages.NAME_REQUIRED,
            'string.min': TaskEditValidationMessages.NAME_MIN_LENGTH,
            'string.max': TaskEditValidationMessages.NAME_MAX_LENGTH,
        }),
    listId: joi
        .number()
        .messages({
            'number.base':
                TaskEditValidationMessages.LIST_ID_NOT_NUMBER
        }),
    description: joi
        .string()
        .min(TaskEditValidationRules.MIN_DESCRIPTION_LENGTH)
        .messages({
            'string.min': TaskEditValidationMessages.DESCRIPTION_MIN_LENGTH,
        }),
    priority: joi
        .string()
        .valid(...Object.values(TaskPriority)),
    dueDate: joi.string()
});

export { TaskEditValidationSchema };
