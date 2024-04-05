import joi from 'joi';

import {
    BoardEditValidationMessages,
    BoardEditValidationRules,
} from './validation-enums/enums.js';
import { UpdateBoardForm } from '../types/update-board.type.js';

const BoardEditValidationSchema = joi.object<UpdateBoardForm, true>({
    name: joi
        .string()
        .trim()
        .min(BoardEditValidationRules.MIN_NAME_LENGTH)
        .max(BoardEditValidationRules.MAX_NAME_LENGTH)
        .messages({
            'string.empty': BoardEditValidationMessages.NAME_REQUIRED,
            'string.min': BoardEditValidationMessages.NAME_MIN_LENGTH,
            'string.max': BoardEditValidationMessages.NAME_MAX_LENGTH,
        })
});

export { BoardEditValidationSchema };
