class History {
  constructor(router) {
    this.current = { path: '/', matched: [] }//这是当前的route
    // { path: '/home', matched: [{ path: '/', component: Home }{ path: '/a', component: HomeA }] }
    this.router = router

  }

  transitionTo(location) {

    // beforeHooks执行完毕，下面的逻辑才能继续

    // location = '/about/a/children'
    // 解析location ,给current赋值,这个location一看就是我们的match里的pathMap的一个键名
    // 这里通过location找route其实就是靠的match,开工
    // const route = this.router.match(location) //现在知道match逻辑了，可以继续写matcch了
    // this.current = route
    // // current变化以后将 Vue实例上的_route重新赋值，达到响应式的目的，但是这里拿不到实例，可以放个回调把这个操作存起来，源码叫listen
    // this.cb()
    // 可以通过 this.router.beforHooks


    const queue = this.router.beforeHooks || []
    const runQueue = (queue, iterator, complete) => {
      const next = (index) => {
        if (index >= queue.length) {
          console.log('index', index)
          return complete()
        }

        iterator(queue[index], () => next(index + 1))
      }
      next(0)
    }

    const iterator = (hook, next) => {
      /* 
      to =  this.router.match(location)
      from = this.current
      next 执行下一个hook的方法  ++index   hooks[index] next为空的时候执行跳转，如果没有next结束，那就是拦截了不让跳转
      */

      hook(this.router.match(location), this.current, next)
    }

    runQueue(queue, iterator, () => this.complete(location))





  }

  complete(location) {
    const route = this.router.match(location) //现在知道match逻辑了，可以继续写matcch了
    this.current = route
    console.log('执行啊',this.current)
    // current变化以后将 Vue实例上的_route重新赋值，达到响应式的目的，但是这里拿不到实例，可以放个回调把这个操作存起来，源码叫listen
    this.cb()
  }

  listen(cb) { // 保存回调函数
    this.cb = cb;
  }

}

export default History