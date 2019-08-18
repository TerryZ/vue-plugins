import con from '@/config/constants'

const needAuth = router => {
  const login = window.sessionStorage.getItem(con.keys.auth)
  /*
  let a = (!login || login==='undefined') && router.matched.some(item=>{
      return !item.meta || typeof(item.meta.auth)==='undefined' || item.meta.auth;
  });
  */
  // console.log(router)
  return (!login || Object.keys(login).length === 0 || login === 'undefined' || login === 'null') &&
        router.matched.some(item => item.meta.auth !== false)
}

/**
 * vue router interceptor, filter auth info
 * @param vue - vue instance
 */
const routerInterceptor = vue => {
  // console.log(sessionStorage.getItem(con.keys.auth))
  // console.log(!!sessionStorage.getItem(con.keys.auth))
  // console.log(typeof(sessionStorage.getItem(con.keys.auth)))
  // console.log(vue.$router.currentRoute)
  // if(!needAuth(vue.$router.currentRoute)) vue.$router.push({path: con.login});
  vue.$router.beforeEach((to, from, next) => {
    // console.log(to)
    if (needAuth(to)) next({ path: con.login })
    else next()
  })
}

/**
 * config vue router interceptor, filter auth info
 * @param router - the Vue Router instance
 */
const routerGuards = router => {
  router.beforeEach((to, from, next) => {
    /*
    if(needAuth(to)) next({path: con.login});
    else next();
    */
    next()
  })
}

export { routerInterceptor }
export { routerGuards }
