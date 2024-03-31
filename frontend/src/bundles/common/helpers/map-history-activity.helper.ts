const Action = {
    Add: 'Add',
    Delete: 'Delete',
    Update: 'Change'
};

const Property = {
    Name: 'name',
    Priority: 'priority',
    ListId: 'listId',
    Description: 'description',
    DueDate: 'dueDate'
};

const FormattedAction = {
    Add: 'added',
    Delete: 'deleted',
    ChangeName: 'renamed',
    ChangeList: 'moved',
    ChangeDescription: 'changed description of',
    ChangePriority: 'changed priority of',
    ChangeDueDate: 'changed due date of'
};

export function mapHistoryActivity(actionType: string, property: string|null):string {
    let mappedActionName = actionType;
    if (property && actionType==Action.Update) {
        switch (property) {
            case Property.Name:
                mappedActionName = FormattedAction.ChangeName;
                break;
            case Property.Priority:
                mappedActionName = FormattedAction.ChangePriority;
                break;
            case Property.Description:
                mappedActionName = FormattedAction.ChangeDescription;
                break;
            case Property.DueDate:
                mappedActionName = FormattedAction.ChangeDueDate;
                break;
            case Property.ListId:
                mappedActionName = FormattedAction.ChangeList;
                break;
        }
    }
    else{
        switch (actionType) {
            case Action.Add:
                mappedActionName = FormattedAction.Add;
                break;
            case Action.Delete:
                mappedActionName = FormattedAction.Delete;
                break;
        }
    }

    return mappedActionName;
}