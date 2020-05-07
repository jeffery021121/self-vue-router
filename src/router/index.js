import Vue from 'vue'
// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import VueRouter from '../../modules/vue-router'
// Vue.use(VueRouter)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children: [
      {
        path: 'childrenAbout', // 这里不能有/
        name: 'childrenAbout',
        component: About
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

// const router = new VueRouter({
//   mode: 'hash',
//   base: process.env.BASE_URL,
//   routes
// })

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
