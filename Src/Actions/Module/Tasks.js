import * as actionType from "../../Const/Actions"
export const setTasks = (listtask) => ({
    type: actionType.SET_TASKS,
    list : listtask
});

export const setSelectedTask = (task) => ({
    type: actionType.SET_SELECTED_TASK,
    selected:task
});

export const setLastAddedTask = (task) => ({
    type: actionType.SET_LAST_ADDED_TASK,
    lastAdded:task
});

export const setMineTask = (task) => ({
    type: actionType.SET_MYTASK,
    mine:task
});

export const setTaskDetails = (task) => ({
    type: actionType.SET_TASK_DETAILS,
    taskdetails:task
});

export const setTaskStatusFilter = (filter) => ({
    type: actionType.SET_TASK_STATUS_FILTER,
    statusFilter:filter
});