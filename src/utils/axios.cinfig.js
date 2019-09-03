// 处理axios拦截器 请求拦截器  响应拦截器
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值基础地址
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
// 导出
export default axios
