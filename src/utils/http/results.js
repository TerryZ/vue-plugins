import con from '@/config/constants'
import Url from '@/utils/url'
// import Cache from '@/utils/cache/cache';

export default class HttpResults {
  constructor (response, vue) {
    this.FAIL = 0
    this.SUCCESS = 1
    this.VALIDATE = 2
    this.TIMEOUT = 3

    this.data = response.data
  }

  /**
     * system error, business error, unexpected error
     */
  fail (vue) {
    /*
        let errmsg = [];
        if(this.data.errorMessage){
            if(Array.isArray(this.data.errorMessage) && this.data.errorMessage.length){
                errmsg = this.data.errorMessage.map(val=>val.message);
            }else if(typeof this.data.errorMessage === 'string'){
                errmsg.push(this.data.errorMessage);
            }
        }
        const message = errmsg.length?errmsg.join("<br/>"):'系统异常，请联系管理员！';
        vue.$dlg.alert(message, {
            messageType: 'error',
            singletonKey: 'ResponseException'
        });
        */
    throw new Error(this.data.errorMessage || '系统异常，请联系管理员！')
  }

  success () {
    return this.data.values
  }

  /**
     * server side validation
     */
  validate () {
    if (this.data.errorMessage && Array.isArray(this.data.errorMessage) && this.data.errorMessage.length) {
      this.data.errorMessage.map(val => val.message)
    }
  }

  /**
     * session timeout, authorization expired
     */
  timeout (vue) {
    // Cache.remove(con.keys.auth);
    // Cache.remove(con.keys.user);
    vue.$dlg.alert('会话超时，请重新登录!', () => {
      // console.log(vue.rootInstance);
      vue.$dlg.closeAll(() => {
        // console.log(vue.$root);
        // console.log(vue.$dlg.rootInstance.$router);
        // vue.$root.$router.push({ path: con.login });
        window.location.replace(Url.getVueRootPath() + con.login)
      })
    }, {
      messageType: 'warning',
      singletonKey: 'SystemSessionOut'
    })
  }

  values (vue) {
    switch (this.data.httpResult) {
      case this.FAIL: return this.fail(vue)
      case this.VALIDATE: return this.validate(vue)
      case this.TIMEOUT: return this.timeout(vue)
      case this.SUCCESS: return this.success(vue)
    }
  }
}
