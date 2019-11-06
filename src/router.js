import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/views/Home.vue'], resolve)
    },
    {
      path: '/User',
      name: 'user',
      component: resolve => require(['@/views/user/User.vue'], resolve)
    },
    {
      path: '/NewAddress',
      name: 'newAddress',
      component: resolve => require(['@/views/user/NewAddress.vue'], resolve)
    },
    {
      path: '/BackupsAddress',
      name: 'backupsAddress',
      component: resolve => require(['@/views/user/BackupsAddress.vue'], resolve)
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
