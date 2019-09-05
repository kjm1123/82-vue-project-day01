// 处理axios拦截器 请求拦截器  响应拦截器
import axios from 'axios'
import router from '../permmsion'
import { Message } from 'element-ui'
import jsonBigInt from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值基础地址
axios.defaults.transformResponse = [function (data) {
  // data是响应回来的字符串
  return jsonBigInt.parse(data)
}]

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // config 是axios的默认请求配置  和传入的配置结合出来的
//   必须return
//  先获取令牌token
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}` // 统一注入token
  // debugger
  return config
}, function () {})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400 :
      message = '请求参数错误'
      break
    case 403 :
      message = '用户非实名认证用户，无权限登录'
      break
    case 507 :
      message = '服务库或数据库异常'
      break
    case 404 :
      message = '手机号不正确'
      break
    case 401 :
      // 因为token 可能会失效或者过期，清除垃圾token
      window.localStorage.clear()
      //  强行跳转到首页
      router.push('./login')
      break
    default :
      message = ' 未知错误'
      break
  }
  // 现在使用(提示)
  Message({ type: 'warning', message: message })
  // 返回一个新对象,不会再进入那个旧的指令里边去了
  return new Promise(function () {}) // 直接返回一个peromiss  表示错误已经停止
  // console.log(error)
})

// 导出
export default axios
