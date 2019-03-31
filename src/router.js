import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/Index.vue')
    },
    {
      path: '/eventos',
      name: 'Principal',
      component: () => import('@/views/Principal.vue')
    },
    {
      path: '/crearEvento',
      name: 'CrearEvento',
      component: () => import('@/views/Create.vue')
    },
    {
      path: '/perfil',
      name: 'Pefril',
      component: () => import('@/views/PerfilUsuario.vue')
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
