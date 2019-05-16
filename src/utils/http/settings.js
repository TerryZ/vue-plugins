import axios from 'axios';

export default class HttpSettings {
    constructor(){
        this.http = axios.create();
        this.setDefaults();
        this.setInterceptors();
    }

    setDefaults(){
        this.http.defaults.headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=UTF-8'
            //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        this.http.defaults.timeout = 10000;
        //if(!ie9) axios.defaults.baseURL = config.baseUrl;
        this.http.defaults.withCredentials = true;
    }

    setInterceptors(){
        this.http.interceptors.request.use(config => {
            // loading
            config.headers.Accept = 'application/json';
            /*
            if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers.Authorization = `token ${store.state.token}`;
            }
            */
            return config;
        }, error => Promise.reject(error));

        /*
        this.http.interceptors.response.use(response => {
            return response;
        }, error => Promise.resolve(error.response));
        */
    }

    getInstance(){
        return this.http;
    }
}