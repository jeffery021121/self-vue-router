import BaseHistory from './base'

class BrowserHistory extends BaseHistory {
  constructor(props){
    super(props)
    console.log('创建 BrowserHistory ')
  }
}

export default BrowserHistory