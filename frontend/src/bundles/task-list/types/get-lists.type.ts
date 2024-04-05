import { type CreateListResponse } from './create-list.type';

type GetAllListsResponse = CreateListResponse[];
type GetListsRequest={
    boardId:number
}
export {  type GetListsRequest, type GetAllListsResponse };