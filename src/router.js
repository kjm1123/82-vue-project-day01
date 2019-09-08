import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import Login from './views/login.vue/index.vue'
import Main from './views/home.vue/main.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      // 默认的二级路由 就是什么也不写
      children: [{
        path: '',
        component: Main
      },
      {
        path: '/home/comment',
        component: () => import('./views/comment/index.vue')
      },
      {
        path: '/home/material',
        component: () => import('./views/material/index.vue')
      },
      {
        path: '/home/articles',
        component: () => import('./views/articles/index.vue')
      },
      // 发布文章
      {
        path: '/home/pubilish',
        component: () => import('./views/publish/index.vue')
      },
      // 修改文章
      {
        path: '/home/pubilish/:articleId', // 定义动态路由参数
        component: () => import('./views/publish/index.vue')
      }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // components  后面可以很组件 也可以跟函数
    //   // spa 缺点  首次加载慢  按需加载
    //   // 点击导航  跳转到about 时才回去加载about  而且只有一次
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
