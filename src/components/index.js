// 引入组件
import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
// 所有自定义的组建的插件(全局注册)
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside) // 注册左侧导航事件
    Vue.component('layout-header', layoutHeader) // 注册头部组建
  }
}
