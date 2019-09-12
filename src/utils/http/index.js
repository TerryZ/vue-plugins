import Http from './http'

const Plugin = {
  install (Vue, options = {}) {
    /*
    Vue.prototype.$http = function(url, data){
        return http.post(url, data, this);
    };
    */
    const handle = function (url, data) {
      return new Http().lookup(url, data, this)
    }
    Object.defineProperty(Vue.prototype, '$http', { value: handle })
  }
}

export default Plugin
