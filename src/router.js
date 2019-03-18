import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import Index from '@/views/Index.vue';
import Principal from '@/views/Principal.vue';



export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/eventos',
      name: 'Principal',
      component: Principal
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
