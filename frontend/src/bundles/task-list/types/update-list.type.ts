import { type CreateListRequest, type CreateListResponse } from './create-list.type';

type UpdateListRequest = Partial<CreateListRequest> &
{
    id:number;
};

export { type UpdateListRequest, type CreateListResponse as UpdateListResponse };