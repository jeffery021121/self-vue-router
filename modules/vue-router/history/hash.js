import BaseHistory from './base'

const ensureSlash = () => {
  // window.location.href.slice('#')[1]
  if (window.location.hash) {
    return;
  }
  window.location.hash = '/';
}
class HashHistory extends BaseHistory {
  constructor(props) {
    super(props)
    // hash路由的话，这里判断一下路径，如果没有#的话，走到/#/这个默认路由来,源码就提了一个函数叫ensureSlash
    ensureSlash()
  }

  getCurrentLocation() {
    return window.location.hash.slice(1)
  }

}

export default HashHistory