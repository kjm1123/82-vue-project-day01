import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入UI (框架组件)
import Component from './components/index' // 自定义组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './style/index.less' //
import axios from 'axios' // 引入初始化项目,包括padding和 margin
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值基础地址
Vue.prototype.$axios = axios // 给Vue对象的原型属性赋值,那么所有的Vue实例自动拥有$axios

Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册ElementUI组件,可以在任意位置使用
Vue.use(Component) // 全局注册自定义组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
