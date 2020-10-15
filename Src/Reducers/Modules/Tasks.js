import * as actionType from'../../Const/Actions'
import taskState from '../../Store/Modules/Taks';

const task = (state = taskState, action) => {
    switch (action.type) {
        case actionType.SET_TASKS:
            return {
                ...state,
                list:action.list,
            };
        case actionType.SET_SELECTED_TASK:
            return {
                ...state,
                selected:action.selected,
            };
        case actionType.SET_LAST_ADDED_TASK:
            return {
                ...state,
                lastAdded:action.lastAdded,
                list:[action.lastAdded, ...state.list],
            };
        case actionType.SET_MYTASK:
            return {
                ...state,
                mine:{
                    all:action.mine,
                    backlogs:action.mine.filter((el) => el.Type == 1),
                    plans:action.mine.filter((el) => el.Type == 2),
                    doings:action.mine.filter((el) => el.Type == 3),
                    checks:action.mine.filter((el) => el.Type == 4),
                    done:action.mine.filter((el) => el.Type == 5)
                }
            };
        
        case actionType.SET_TASK_DETAILS:
            return {
                ...state,
                taskdetails:action.taskdetails,
            };
        
        case actionType.SET_TASK_STATUS_FILTER:
            return {
                ...state,
                statusFilter:action.statusFilter,
            };
        default :
            return state;
    }
}

export default task;