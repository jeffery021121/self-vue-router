const createMatcher = (routes) => {
  // 先处理参数为 pathlist 和 pathMap
  // pathlist 就是将所有的path取出来，放到一个数组里
  // 因为要递归，所以直接写一个其他的函数出来操作这里，源码叫createRouteMap
  const { pathlist, pathMap } = createRouteMap(routes)
  const addroutes = (routes) => {
    createRouteMap(routes, pathlist, pathMap)
  }

  const match = (location) => {
    return {}
  }

  return { match, addroutes }
}

/* 
// 传入一个path，匹配出对应的component。这个方法忘记在哪里使用了，也不知道匹配的到底是一个路径还是一系列了，先写成一个吧
// 额，瞅了一眼源码，match是用来匹配路由的，不是匹配记录的，所以要把所有的记录都匹配出来，先不写
const match = (location) => {
  // 返回的应该是这样的
  // { path: '/home', matched: [{ path: '/', component: Home }{ path: '/a', component: HomeA }] }
  // 同样因为需要 pathlist 和pathMap 所以放到 matcher函数中
  return {}
} */

/* 
// 动态添加路径，一般用于动态引入和权限路由，其实就是将现有的routes和传入的做合并，同时修改pathlist和pathmap
const addroutes = (routes) => {
  
  // 这里其实思考一下初始化的时候，也是init里传入一个routes，然后操作这个routes。
  // 和addroutes逻辑是一样的，区别只是初始化的时候pathList和pathMap有没有初始值，于是有了第三个版本

  // 但是这里拿不到处理好的 pathlist, pathMap，所以两个方案，一个是闭包，一个是写到createMatcher函数中去，采用后者
  createRouteMap(routes, pathlist, pathMap)
}
 */

//-----------------下面是处理routes获取pathlist, pathMap的三个版本---------------------

// 版本1  如果这样写的话，pathlist, pathMap 没有办法返回，再包裹一层
// let pathlist, pathMap
// const createRouteMap = (routes) => {
//   for (let index = 0; index < routes.length; index++) {
//     const record = routes[index]
//     pathlist.push(record.path)
//     pathMap[record.path] = record
//     if (record.children && record.children, length) {
//       createRouteMap(record.children)
//     }
//   }
// }

// 版本2 下面是包裹一层的代码
// const createRouteMap = (routes) => {
//   let pathlist = [], pathMap = {}
//   addRouteRecord(routes, pathlist, pathMap)
//   return { pathlist, pathMap }
// }
// // 这个方法源码叫addRouteRecord
// const addRouteRecord = (routes, pathlist, pathMap, parentRecord) => {
//   for (let index = 0; index < routes.length; index++) {
//     const record = routes[index]
//     if (parentRecord) {
//       record.parent = parentRecord
//       record.path = `${parentRecord.path}/${record.path}`
//     }
//     // 直接添加record的话，值找不到全部路径的，把它的父亲的路径拼进去，把parent直接拼到记录上，所以在遍历子集的时候再加一个参数parentRecord
//     pathlist.push(record.path)
//     pathMap[record.path] = record
//     if (record.children && record.children.length) {
//       addRouteRecord(record.children, pathlist, pathMap, record)
//     }
//   }
// }

// 版本3 支持addRoutes方法，不只是可以初始化数据，也可以添加了
const createRouteMap = (routes, oldPathlist, oldPathMap) => {
  // 增加 oldPathlist, oldPathMap两个参数
  let pathlist = oldPathlist || []
  let pathMap = oldPathMap || {}
  addRouteRecord(routes, pathlist, pathMap)
  return { pathlist, pathMap }
}
const addRouteRecord = (routes, pathlist, pathMap, parentRecord) => {
  for (let index = 0; index < routes.length; index++) {
    const record = routes[index]
    if (parentRecord) {
      record.parent = parentRecord
      record.path = `${parentRecord.path}/${record.path}`
    }
    pathlist.push(record.path)
    pathMap[record.path] = record
    if (record.children && record.children.length) {
      addRouteRecord(record.children, pathlist, pathMap, record)
    }
  }
}

export default createMatcher