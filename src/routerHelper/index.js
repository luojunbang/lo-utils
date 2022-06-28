export function routeAutoLink(routePath, layoutComponentLists, routeConfig) {
  console.log(routePath)

  if (!Array.isArray(layoutComponentLists)) throw Error('Should be Array fo LayoutComponents.')
  // 判断是否是index.vue或者 DIR/DIR.vue
  const isIndex = path => {
    if (!path) return false
    const _path = path.replace(/^\.\//, '').split('/')
    if (_path.length == 1) return /\.vue$/.test(path)
    else if (_path.length == 2) {
      const [dir, name] = _path.slice(-2)
      return dir.toLowerCase() + '.vue' === name.toLowerCase() || name.toLowerCase() === 'index.vue'
    } else return false
  }
  const removePathParam = path => path.replace(/\/:[\S]+$/, '')

  const getRoutePath = val => {
    const _val = val.split('/')
    if (_val.length > 1) {
      return _val[_val.length - 2]
    } else return val.replace(/\.vue$/, '')
  }
  const generatorRoute = (path, fullPath, config) => {
    const route = {
      path: path,
      component: fullPath,
      name: fullPath
        .split('/')
        .join('_')
        .replace(/\.vue$/, ''),
      meta: {},
    }
    if (!config) return route
    if (config.params) route.path += (route.path ? '/' : '') + config.params
    return { ...config, ...route }
  }
  let routes = []
  routePath = routePath.map(i => i.replace(/^\.\//, '')).filter(i => isIndex(i.split('/').slice(-2).join('/')))
  routePath.forEach(path => {
    const path_ary = path.split('/')
    let _routes = routes
    const len = path_ary.length
    while (path_ary.length) {
      const _path = path_ary[0]
      const rest_path = path_ary.join('/')
      const foundRoute = _routes.find(({ path }) => removePathParam(path) == `${_path}`)
      if (foundRoute) {
        if (Array.isArray(foundRoute.children)) {
          if (isIndex(rest_path)) {
            foundRoute.children.push(generatorRoute('', path, routeConfig[path]))
            break
          }
        } else {
          console.log(foundRoute)
          const index_path = foundRoute.name.split('_').join('/') + '.vue' //复原
          foundRoute.children = [generatorRoute('', index_path, routeConfig[index_path])]
          foundRoute.path = removePathParam(foundRoute.path)
          if (!layoutComponentLists[len - path_ary.length]) throw new Error(`Level ${len - path_ary.length + 1} LayoutComponents is not definded`)
          foundRoute.component = layoutComponentLists[len - path_ary.length]
          delete foundRoute.name
          if (isIndex(rest_path)) {
            _routes.push(generatorRoute(getRoutePath(rest_path), path, routeConfig[path]))
            break
          }
        }
        _routes = foundRoute.children
      } else {
        if (isIndex(rest_path)) {
          _routes.push(generatorRoute(getRoutePath(rest_path), path, routeConfig[path]))
          break
        } else {
          if (!layoutComponentLists[len - path_ary.length]) throw new Error(`Level ${len - path_ary.length + 1} LayoutComponents is not definded`)
          _routes.push({ path: `${_path}`, component: layoutComponentLists[len - path_ary.length], children: [] })
          _routes = _routes[_routes.length - 1].children
        }
      }
      path_ary.shift()
    }
  })
  routes = routes.map(i => ({ ...i, path: '/' + i.path }))
  return function toCompoennt(importFn, routeLists) {
    if (!routeLists) routeLists = routes
    return routeLists.map(i => {
      if (i.children) i.children = toCompoennt(importFn, i.children)
      return { ...i, component: typeof i.component === 'string' ? importFn(i.component) : i.component }
    })
  }
}
