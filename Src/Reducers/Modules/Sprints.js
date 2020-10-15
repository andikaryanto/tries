import * as actionType from'../../Const/Actions'
import sprintState from '../../Store/Modules/Sprints';

const sprint = (state = sprintState, action) => {
    switch (action.type) {
        case actionType.SET_SPRINTS:
            return {
                ...state,
                list:action.list,
            };
        case actionType.SET_LAST_ADDED_SPRINT:
            return {
                ...state,
                lastAdded:action.lastAdded,
                list:[action.lastAdded, ...state.list]
            };
        default :
            return state;
    }
}

export default sprint;