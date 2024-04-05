import { ActivityLog } from "~/bundles/history-modal/types/log.type";
import { List } from "~/bundles/task-list/types/list.type";

type Board = {
  id: number,
  name: string,
  dateCreated: string,
  dateUpdated: string,
  logs:ActivityLog[],
  lists:List[],
  recentlyCreated:boolean;
}

export { type Board };