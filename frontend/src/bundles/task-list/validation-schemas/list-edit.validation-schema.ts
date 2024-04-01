import joi from 'joi';

import {
    ListEditValidationMessages,
    ListEditValidationRules,
} from './validation-enums/enums.js';
import { UpdateListForm } from '../types/update-list.type.js';

const ListEditValidationSchema = joi.object<UpdateListForm, true>({
    name: joi
        .string()
        .trim()
        .min(ListEditValidationRules.MIN_NAME_LENGTH)
        .max(ListEditValidationRules.MAX_NAME_LENGTH)
        .messages({
            'string.empty': ListEditValidationMessages.NAME_REQUIRED,
            'string.min': ListEditValidationMessages.NAME_MIN_LENGTH,
            'string.max': ListEditValidationMessages.NAME_MAX_LENGTH,
        })
});

export { ListEditValidationSchema };
