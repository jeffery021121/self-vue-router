import Vue from 'vue'
// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import VueRouter from '../../modules/vue-router'
import AboutA from '../views/AboutA.vue';
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
        component: About,
        children: [
            {
                path: 'a',
                component: AboutA
            },
            {
                path: 'b', component: {
                    render: (h) => <h1>about b</h1>
                },
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

router.beforeEach((to,from,next)=>{ //路由钩子
    setTimeout(() => {
        console.log('1.beforeEach')
        next();
    }, 1000);
})
router.beforeEach((to, from, next) => { //路由钩子
  setTimeout(() => {
    console.log('2.beforeEach')
    next();
  }, 1000);
})
export default router
