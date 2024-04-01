const TaskEditValidationMessages = {
    NAME_REQUIRED: 'Task name can not be empty',
    NAME_MIN_LENGTH: 'Task name must be at least {{#limit}} characters',
    NAME_MAX_LENGTH: 'Task name must be at most {{#limit}} characters',
    LIST_ID_NOT_NUMBER:'Task list id must be number',
    DESCRIPTION_MIN_LENGTH:'Description must be at least {{#limit}} characters'
} as const;

export { TaskEditValidationMessages };
