
// 根据匹配的route，找到自己是哪一个record，渲染这个record的component
const routerView = {
  name: 'routerView',
  beforeCreate() {
    this.$vnode.data.routerView = true
  },

  methods: {
    getRecord() {
      // const route = this.$route
      let index = 0
      let parent = this.$parent
      while (parent) {
        if (parent.$vnode && parent.$vnode.data.routerView) ++index
        parent = parent.$parent
      }
      console.log('this.$route.matched',this.$route.matched)
      const record = this.$route.matched[index]
      return record
    }
  },
  render(h) {
    // 查找自己是当前第几个router-view找到自己对应的是那个record，并渲染。
    // 查找的逻辑就是想上查找所有的父级，查出来自己是有几个父级route-view那么自己的位置就可以确定啦。
    // 上述逻辑需要route-view有一个唯一标志，这样才可以查是第几个父级
    // 唯一标志有几种方案，一个是给个统一的独一无二的名字，到时候去this.$vnode.tag 上去取   另外就是设置一个独一无二的属性名放到data中
    // 第二个方案比较好，因为我们写在标签上的属性或者说子组件的prop是放在 虚拟dom($vnode)的data.attrs这个属性上的，只有少数不透传的才放在data上
    // 比如 key, ref等，这里重复的几率很小，所以放到data上比较靠谱
    // this.$vnode.data.routerView = true 在最早的时间直接挂载这个属性
    // return <div>1234</div>
    const record = this.getRecord()
    if (record) return h(record.component)
    return h()
  }
}

export default routerView