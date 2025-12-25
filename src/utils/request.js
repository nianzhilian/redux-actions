import axios from "axios";

// 增加拦截器
const service = axios.create({
    baseURL:'/',
    timeout:60000
})

service.interceptors.request.use(config=>{
    const token = window.localStorage.getItem('userToken') || window.sessionStorage.getItem('userToken');
    config.headers = {
        'Content-Type': 'application/json; charset=utf-8',
    }
    if(token){
        config.headers._tokenKey = token;
        config.headers['X-Requested-With'] = true;
    }
    return config;
},error=>{
    return Promise.reject(error);
})

service.interceptors.response.use(response=>{
    return response;
},error=>{
    return Promise.reject(error);
})

export default service;