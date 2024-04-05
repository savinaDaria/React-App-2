import { type CreateListResponse } from './create-list.type';

type UpdateListForm= {
    name:string
};

type UpdateListRequest = UpdateListForm &
{
    id:number;
};

export {type UpdateListForm, type UpdateListRequest, type CreateListResponse as UpdateListResponse };