import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
new Vue({
  el:'#app',//不选这个就用下面的$mount也一样
  router,
  render: h => h(App)
})
// .$mount('#app')
