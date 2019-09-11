import router from './router'
// 先下载进度条,然后引用
import nprogress from 'nprogress'
// 还需要引用样式
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  nprogress.start() // 开启进度条
  // 如果要去的地址是home开始,就要拦截,就说明需要判断当前是不是要登录
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      // 放行
      next()
    } else {
      next('/login')
    }
  } else {
    // 如果没有/home 可以认为你是安全的,不需要控制页面
    next()
  }
})
// 看文档发现,要关闭进度条
router.afterEach(function () {
  nprogress.done() // done就是关闭进度条的意思
})
// 导出
export default router
