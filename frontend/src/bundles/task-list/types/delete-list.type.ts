import { type CreateListResponse } from './create-list.type';

type DeleteListRequest = Pick<CreateListResponse,'id'>;

export { type DeleteListRequest };