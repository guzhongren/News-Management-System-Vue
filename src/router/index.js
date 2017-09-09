import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Cms from '@/page/Cms'
import Login from '@/page/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/cms',
      name: 'Cms',
      component: Cms
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
