import install from './install'
import createMatcher from './create-matcher'
import BrowserHistory from './history/browser'
import HashHistory from './history/hash'

class VueRouter {

  static install = install

  constructor(options) {
    /* 
    options={
        mode: 'hash', // 使用history来进行处理
        routes // 是用 createMatcher
      }
     */
    const { routes, mode } = options
    this.matcher = createMatcher(routes) // 创建匹配器，处理参数 返回 match和addroutes方法

    /* 
    解释一下history是干嘛的，要不然思路就凝滞了
    实现路由最重要的思想就是一件事情 ---> 路径变化以后框架自动切换成对应的组件
    再具体一点就是 路由变化，但是原始页面不能变化，框架却能感知url变化，然后框架主动让组件进行替换即可
    这就说道了 h5 的几个 history api     pushState方法  popState事件  hashChange事件
    window.history.pushState(state, title, path)
    window.addEventListener('popstate', listener, false)
    window.addEventListener('hashchange', listener, false)
    上面已经写好了mactch相关的逻辑了，但是那个只是死方法而已，接下来写history，history其实就是用match的地方，同时
    他的主要功能就一个，跳转（transitionTo方法）。
    而history想要匹配路径就得有match上的一系列方法，先把 router传递过去
    history是route的历史，而不是reaord的历史
    history中有一个current指针，一直指向最新的route。一个transitionTo方法，当路由变化的时候修改current的。
    最后再在Vue上定义一个响应式的数据 _route值为current,每次current变化都改变这个_route即可触发数据响应式，并且拿到应该渲染的记录和component
    
    */

    switch (mode) {
      case 'hash':
        this.history = new HashHistory(this)
        break;
      case 'history': //这里不是browser的原因是要和源码保持一致。。。。
        this.history = new BrowserHistory(this)
        break;
      default:
        this.hashHistory = new HashHistory(this)
        break;
    }
  }

  match(location) {
    const route = this.matcher.match(location)
    return route
  }

  init(app) {
    // 这里要监听路由的变化
    // 但是这里其实有两种路由的形式的，所以将这个监听的逻辑放到两个history类中
    // 源码里这个方法叫 setupHashListener
    // this.hashHistory.handleAAA(cb)

    // 在监听之前先给history赋值一下，根据上线分析指导transitionTo就是干这个的，于是先实现transitionTo

    // 这里的获取当前路径，也会因为mode的不同而不同，所以把这个逻辑放到各自的类中
    // 这一次是为了初始化current

    this.history.listen(() => { // 通过listen方法先注册号回调
      app._route = this.history.current
    })

    this.history.transitionTo(this.history.getCurrentLocation())

    window.addEventListener('hashchange', () => {
      this.history.transitionTo(this.history.getCurrentLocation())
      // 
    })
    // 这个时候应该拿到初始路径，然后做一个跳转
    // 开始init之前，先把基础依赖处理好，就是match和history
  }
}

export default VueRouter