import router from './router'
router.beforeEach(function (to, from, next) {
  // 如果要去的地址是home开始,就要拦截,就说明需要判断当前是不是要登录
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      // 房型
      next()
    } else {
      next('/login')
    }
  } else {
    // 如果没有/home 可以认为你是安全的,不需要控制页面
    next()
  }
})
export default router
