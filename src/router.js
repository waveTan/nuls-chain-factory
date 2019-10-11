import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import NewAddress from './views/user/NewAddress'
import BackupsAddress from './views/user/BackupsAddress'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/User',
      name: 'user',
      component: resolve => require(['@/views/user/User.vue'], resolve)
    },
    {
      path: '/NewAddress',
      name: 'newAddress',
      component: NewAddress
    },
    {
      path: '/BackupsAddress',
      name: 'backupsAddress',
      component: BackupsAddress
    },
    {
      path: '/Module',
      name: 'module',
      component: resolve => require(['@/views/module/ModuleList.vue'], resolve)
    },
    {
      path: '/Module/Info',
      name: 'moduleInfo',
      component: resolve => require(['@/views/module/ModuleInfo.vue'], resolve)
    },
    {
      path: '/Module/add',
      name: 'moduleAdd',
      component: resolve => require(['@/views/module/ModuleAdd.vue'], resolve)
    },
    {
      path: '/Build',
      name: 'build',
      component: resolve => require(['@/views/build/Build.vue'], resolve)
    },

  ]
})
