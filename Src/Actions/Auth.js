import * as actionType from "../Const/Actions"
export const loggingIn = () => ({
    type: actionType.LOGGING_IN,
    isloggingIn:true,
    isLoggedIn:false,
    message:""
});

export const loggedIn = (isLoggedIn,  message = "") => ({
    type: actionType.LOGGED_IN,
    isloggingIn:false,
    isLoggedIn:isLoggedIn,
    message:message
});
