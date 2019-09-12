/**
 * http 数据请求封装
 *
 * @author Terry(https://github.com/TerryZ)
 *
 */
'use strict';

//import Cache from '@/utils/cache/cache';

import HttpSettings from './settings';
import HttpResults from './results';

import states from './states';

const API_PATH = process.env.VUE_APP_API;

export default class Http {
    constructor(){
        this.http = new HttpSettings().getInstance();
    }

    errorHandle(resp, vue){
        if(process.env.NODE_ENV === 'development') console.dir(resp);

    let errorMsg = '系统异常，请联系管理员！';
    if(resp instanceof Error) {
      const errorCode = resp && resp.response && resp.response.status;
      errorMsg = typeof errorCode === 'number' ? states[errorCode] || '系统异常，请联系管理员！' : resp.message;
    }

    vue.$dlg.alert(errorMsg, { messageType: 'error' });

    return Promise.reject(errorMsg);
    }

    lookup(url, data, vue){
        const settings = {
      method: 'post',
      url: `${API_PATH}${url}`,
      data: data || {}//qs.stringify(data),
    };
    //const token = Cache.get(constants.keys.token);
    //if(token) settings.headers = { Authorization: `Bearer ${token}` };
        return this.http(settings)
      .then(resp => new HttpResults(resp).values(vue))
      .catch(resp => this.errorHandle(resp, vue));
    }
}
