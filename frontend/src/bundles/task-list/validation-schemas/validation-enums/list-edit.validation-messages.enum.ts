const ListEditValidationMessages = {
    NAME_REQUIRED: 'List name can not be empty',
    NAME_MIN_LENGTH: 'List name must be at least {{#limit}} characters',
    NAME_MAX_LENGTH: 'List name must be at most {{#limit}} characters'
} as const;

export { ListEditValidationMessages };
