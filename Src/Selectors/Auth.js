import axios from "axios";
import { AUTH, REGISTER } from "../Const/Api";
import { setToken, setUserid, setUsername, getToken, setPhoto, setPosition } from "../Storage/Users"

export const setLoggedIn = (complete) => () => {
    return async function(dispatch, getState)  {
        let token = await getToken();
        if(token != "" && token != null){
            complete(true);
        } else {
            complete(false);
        }
        return;
    }
}

export const Authenticate = ({username, password}, complete, error = null) => {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            method: "GET",
            headers: { 
                'Content-Type': 'application/json',
                // "Authorization" : User.getToken()
            }
        };
        
            let endpoit = AUTH+username+"/"+password;
            fetch(endpoit, requestOptions)
            .then(async results => {
                if(results.status === 200){
                    return results.json();
                } else {
                    let data = await results.json();
                    throw new Error(data.Message);
                }
            })
            .then(async data => {
                var json = data;
                if(json.Status.Code === 1000){
                    await setToken(json.SessionToken);
                    await setUsername(json.Username);
                    await setPhoto(json.Photo || "");
                    await setPosition(json.Position || "");
                    resolve({isLoggedIn: true, message:""});
                    // dispatch(loggedIn(true));
                } else {
                    User.removeToken();
                    throw new Error(data.Message);
                }
            })
            .catch(async err => {
                // console.log(awamessage;
                if(err != null)
                    reject({message:err.message})
            })
    })
    
}

export const Register = ({email, name, username, password}) => {
    return new Promise((resolve, reject) => {
       
        const requestOptions = {
            
            headers: { 
                'Content-Type': 'application/json'
            },
        };

        const body = {
            Email:email,
            Name:name,
            Username:username,
            Password:password
        }
        
        let endpoit = REGISTER;
        console.log(endpoit);
        axios.post(endpoit, JSON.stringify(body), requestOptions)
        .then(results => {
            if(results.status === 200){
                return results.data;
            } else {
               
                throw new Error(results.data.Message);
            }
        })
        .then(async data => {
            var json = data;
            if(json.Status.Code === 1000){
                resolve({isRegistered: true, message:json.Message});
                // dispatch(loggedIn(true));
            } else {
                User.removeToken();
                throw new Error(data.Message);
            }
        })
        .catch(async err => {
            // console.log(awamessage;
            console.log(err.response)
            if(err != null)
                reject({message:err.message})
        })
    })
    
}