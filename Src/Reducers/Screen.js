import * as actionType from'../Const/Actions'
import screenState from '../Store/Screen';

const screen = (state = screenState, action) => {
    switch (action.type) {
        case actionType.SCREEN_LOADING:
            return {
                ...state,
                loading:action.loading
            };
       
        // case actionType.SCREEN_LOADED:
        //     return {
        //         ...state,
        //         data:action.data,
        //         message:action.message
        //     };
       
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

export default screen;