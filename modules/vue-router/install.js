import routerLink from './components/router-link'
import routerView from './components/router-view'

const install = (Vue, options) => {
  Vue.component('router-view', routerLink)
  Vue.component('router-link', routerView)

  // 开始执行VueRouter的初始化逻辑
  Vue.mixin({
    beforeCreate: function () {
      /* 
      1. 先给所有的组件注入 _router属性
      2. 执行VueRouter实例 即 根组件的参数router 的init方法
      */
      if (this.$options.router) { // 根组件，其实这里不是组件，是根实例
        this._routerRoot = this // ?忘记是否有了
        this._router = this.$options.router
        // 这个方法需要时是Vue的实例，我一开始传成了大Vue,具体需要什么执行逻辑才知道，接下来去写类里的代码
        this._router.init(this)
      } else {//其他组件
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    },
  })
  // 使用代理的方式，添加每个实例都需要的$router和 $route(这个目前还不知道是啥，先不管)
  Object.defineProperty(Vue.prototype, '$router', {
    get() { // 这种代理上来的属性，在浏览器上是加了一层遮罩的颜色。。。
      return this._routerRoot._router
    }
  })
}

export default install