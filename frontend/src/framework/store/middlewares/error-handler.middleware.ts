// import { type Action, type Middleware } from '@reduxjs/toolkit';
// import { isRejected } from '@reduxjs/toolkit';

// import { NotificationType } from '~/framework/services/notification/enums/notification-type.enum.js';

// const errorHandler: Middleware = function () {
//     return function (next) {
//         return function (action: Action) {
//             const result: unknown = next(action);

//             if (isRejected(result) && !result.meta.rejectedWithValue) {
//                 const message = result.error.message ?? 'Try again later';

               
//                 const type = NotificationType.ERROR;

//                 return next();
//             }

//             return result;
//         };
//     };
// };

// export { errorHandler };
