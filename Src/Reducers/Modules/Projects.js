import * as actionType from'../../Const/Actions'
import projectState from '../../Store/Modules/Projects';

const project = (state = projectState, action) => {
    switch (action.type) {
        case actionType.SET_PROJECTS:
            return {
                ...state,
                list:action.list,
            };
        case actionType.SET_SELECTED_PROJECT:
            return {
                ...state,
                selected:action.selected,
            };
        case actionType.SET_LAST_ADDED_PROJECT:
            return {
                ...state,
                lastAdded:action.lastAdded,
                list:[action.lastAdded, ...state.list],
            };
        default :
            return state;
    }
}

export default project;