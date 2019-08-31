import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // components  后面可以很组件 也可以跟函数
      // spa 缺点  首次加载慢  按需加载
      // 点击导航  跳转到about 时才回去加载about  而且只有一次
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
