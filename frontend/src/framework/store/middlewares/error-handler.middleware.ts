import {  type Middleware } from '@reduxjs/toolkit';
import { isRejected } from '@reduxjs/toolkit';

import { notification } from '~/framework/services/services';

const errorHandler: Middleware = () => next => action => {
    const result = next(action);
  
    if (isRejected(result)) {
      const message = result.error.message ?? 'An error occurred. Please try again later.';
        notification.ERROR(message)
    }
  
    return result;
  };
  
  export { errorHandler };
