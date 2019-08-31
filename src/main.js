import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './style/index.less' // 引入初始化项目,包括padding和 margin
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册ElementUI组件,可以在任意位置使用
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
