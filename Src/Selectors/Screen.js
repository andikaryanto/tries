
import { getToken } from "../Storage/Users"
import axios from 'axios'

export const getData = async (url, controller, params = {}, header={}) => {
   
    let token = await getToken();
    // console.log(token);
    return new Promise((resolve, reject) => {

    
        const requestOptions = {
           
            params:{
                ...params
            },
            headers : {
                ...header,
                "Authorization" :token,
                // 'Content-Type': 'application/json'
            }
            // signal:controller.signal
        };
        let endpoit = url;
        console.log(params);
        axios.get(endpoit, requestOptions)
        .then(results => {
            if(results.status === 200){
                return results.data;
            } else {
                let data = results.data;
                throw new Error(data.Message);
            }
        })
        .then(async data => {
            var json = data;
            if(json.Status.Code === 1000){
                resolve(json.Result);
            } else {
                throw Error(data)
            }
        })
        .catch(err => {
            if(err != null)
                reject({message:err.message})
        })
    });
    
}

export const getDataList = async (url, controller,  params={}, header = {}) => {
        
    let token = await getToken();
    return new Promise((resolve, reject) => {
        const requestOptions = {
            params:{
                ...params
            },
            headers : {
                ...header,
                "Authorization" :token,
                // 'Content-Type': 'application/json'
            }
        };

        // abortController(controller);

        let endpoit = url;
        axios.get(endpoit, requestOptions)
        .then(results => {
            if(results.status === 200){
                return results.data;
            } else {
                let data = results.data;
                // console.log(data);
                throw new Error(data.Message);
            }
        })
        .then(async data => {
            var json = data;
            if(json.Status.Code === 1000){
                resolve(json.Results);
            } else {
                throw Error(data)
            }
        })
        .catch(err => {
            if(err != null)
                reject({message:err.message})
        })
    });
    
}
export const postData = async (url, controller, body = {}, params = {}, header = {}) => {
    let token = await getToken();
    return new Promise((resolve, reject) => {
        
        const requestOptions = {
            
            headers: { 
                'Content-Type': 'application/json',
                "Authorization" :token,
                ...header
            },
            params:{
                ...params
            }
            // signal:controller.signal
        };
    
        let endpoit = url;
        axios.post(endpoit, JSON.stringify(body), requestOptions)
        .then(results => {

            if(results.status === 200){
                return results.data;
            } else {
                let data = results.data;
                // console.log(data);
                throw new Error(data.Message);
            }
        })
        .then(async data => {
            var json = data;
            if(json.Status.Code === 1000){
                resolve(json.Result);
            } else {
                throw Error(data.Message)
            }
        })
        .catch(err => {

            if(err != null)
                reject({message:err.message})
            
        })
    });

    
}

export const postMultipart = async (url, controller, body = {}, files = [], params= {}, header = {}) => {
    // if(files.length  == 0){
    //     return postData(url, controller, body);
    // }
    
    let token = await getToken();
    return new Promise((resolve, reject) => {

        let formData = new FormData();

        for (var k in body){
            if (body.hasOwnProperty(k)) {
                formData.append(k, body[k]);
            }
        }

        files.forEach((e, i) => {
            // console.log(e);

            formData.append("files"+i, {
                uri: e.uri,
                name: e.name,
                type: 'multipart/form-data'
            })
        });
        console.log(url);
        
        // formData.append('Content-Type', 'image/png');
        const requestOptions = {
            // headers: { 
            //     ...header,
            //     'Content-Type': 'multipart/form-data'
            //     // "Authorization" :token,
            // },
            params:{
                ...params,
                Authorization : token
            }
            // signal:controller.signal
        };
    
        let endpoit = url;
        axios.post(endpoit, formData, requestOptions)
        .then(results => {
            if(results.status === 200){
                return results.data;
            } else {
                
                throw new Error(results.data.Message);
            }
        })
        .then(async data => {
            var json = data;
            console.log(json);
            if(json.Status.Code === 1000){
                resolve(json.Result);
            } else {
                throw Error(data.Message)
            }
        })
        .catch(err => {
            if(err != null)
                reject({message:err.message})
            
        })
    });
}

export const deleteData = async (url, controller, body= {}, header = {}) => {
    let token = await getToken();
    return new Promise((resolve, reject) => {
        const requestOptions = {            
            headers: { 
                'Content-Type': 'application/json',
                "Authorization" :token,
                ...header
            },
            params:{
                ...body
            }
            // signal:controller.signal
        };
    
        let endpoit = url;
        // console.log(endpoit, body)
        axios.delete(endpoit, requestOptions)
        .then( results => {
            if(results.status === 200){
                return results.data;
            } else {
               
                throw new Error(results.data.Message);
            }
        })
        .then(async data => {
            var json = data;
            if(json.Status.Code === 1000){
                resolve(json.Result);
            } else {
                throw Error(data.Message)
            }
        })
        .catch(err => {
            if(err != null)
                reject({message:err.message})
            
        })
    });

    
}