import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Cms from '@/page/Cms'
import Login from '@/page/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/cms',
      name: 'Cms',
      component: Cms
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
