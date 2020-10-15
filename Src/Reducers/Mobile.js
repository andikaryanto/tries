import * as actionType from'../Const/Actions'
import mobileState from '../Store/Mobile';

const mobile = (state = mobileState, action) => {
    switch (action.type) {
        case actionType.SHOW_KEYBOARD:
            return {
                ...state,
                isKeyboardShown:true,
            };
        case actionType.HIDE_KEYBOARD:
            return {
                ...state,
                isKeyboardShown:false,
            };
        default :
            return state;
    }
}

export default mobile;