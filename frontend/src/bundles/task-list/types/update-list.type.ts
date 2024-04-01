import { type CreateListRequest, type CreateListResponse } from './create-list.type';

type UpdateListForm= Partial<CreateListRequest> ;

type UpdateListRequest = UpdateListForm &
{
    id:number;
};

export {type UpdateListForm, type UpdateListRequest, type CreateListResponse as UpdateListResponse };