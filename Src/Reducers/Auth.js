import * as actionType from'../Const/Actions'
import authState from '../Store/Auth';
import { getToken } from '../Storage/Users';

const auth = (state = authState, action) => {
    switch (action.type) {
        case actionType.LOGGING_IN:
            return {
                ...state,
                isLoggedIn:false,
                isLoggingIn:true,
                message:action.message
            };
       
        case actionType.LOGGED_IN:
            return {
                ...state,
                isLoggedIn:action.isLoggedIn,
                isLoggingIn:false,
                message:action.message
            };
       
        default :
            // let token = await getToken(); 
            // console.log(token);

            // const token = async () => {
            //     // return await getToken();
            //     return {
            //         ...state,
            //         isLoggedIn:await getToken(),
            //         // isLoggedIn:await token() != false ? true : false,
            //         isLoggingIn:false,
            //         message:""
            //     };
            // }

            // return token();

            return {
                ...state,
            };
    }
}

export default auth;