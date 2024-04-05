const BoardEditValidationMessages = {
    NAME_REQUIRED: 'Board name can not be empty',
    NAME_MIN_LENGTH: 'Board name must be at least {{#limit}} characters',
    NAME_MAX_LENGTH: 'Board name must be at most {{#limit}} characters'
} as const;

export { BoardEditValidationMessages };
