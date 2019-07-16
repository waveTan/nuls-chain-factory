import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import NewAddress from './views/user/NewAddress'
import ImportAddress from './views/user/ImportAddress'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/NewAddress',
      name: 'newAddress',
      component: NewAddress
    },
    {
      path: '/ImportAddress',
      name: 'importAddress',
      component: ImportAddress
    }

  ]
})
