import { List } from "~/bundles/task-list/types/list.type";

type CreateBoardRequest = {
  name: string,
}

type CreateBoardResponse = {
  id: number,
  name: string,
  lists: List[],
  dateCreated: string,
  dateUpdated: string,
  recentlyCreated: boolean
}

export { type CreateBoardRequest, type CreateBoardResponse };