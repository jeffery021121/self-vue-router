import BaseHistory from './base'

class HashHistory extends BaseHistory {
  constructor(props) {
    super(props)
    console.log('创建 HashHistory')
  }
}

export default HashHistory