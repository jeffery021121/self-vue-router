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
    console.log('实例创建函数触发,参数', options)
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
    history是route的记录，而不是reaord的记录
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
  }

  init() {
    console.log('实例初始化函数触发')
    // 这个时候应该拿到初始路径，然后做一个跳转
    // 开始init之前，先把基础依赖处理好，就是match和history
  }
}

export default VueRouter