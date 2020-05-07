class History {
  constructor(router) {
    console.log('创建 history baseClass')
    this.current={}//这是当前的route
     // { path: '/home', matched: [{ path: '/', component: Home }{ path: '/a', component: HomeA }] }
    this.router = router

  }

  transitionTo(){

  }
}

export default History