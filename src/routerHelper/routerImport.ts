import {  Component } from 'vue'

import {  RouteRecordRaw,  RouteRecordRedirectOption,  RouteMeta,  RouteRecordName,  RouteComponent } from 'vue-router'

interface navRouteConfig {
  path: string
  title: string
  children: navRouteConfig[]
}

interface routerConfig {
  meta?: { title?: string }
  params?: string
}
interface singleRouteConfig {
  path: string
  component: string | RouteComponent | null | undefined
  name?: RouteRecordName
  meta?: RouteMeta
  redirect?: string
  children?: singleRouteConfig[] | undefined
}


type DescribableFunction = {
  description: string
  (someArg: string): RouteComponent | (() => Promise<RouteComponent>)
}

// 判断是否是index.vue或者 */DIR/DIR.vue 不区分大小写
const isIndex = (path: string): boolean => {
  if (!path) return false
  const _path = path.replace(/^\.\//, '').split('/')
  if (_path.length == 1) return /\.vue$/.test(path)
  else if (_path.length == 2) {
    const [dir, name] = _path.slice(-2)
    return dir.toLowerCase() + '.vue' === name.toLowerCase() || name.toLowerCase() === 'index.vue'
  } else return false
}

export function routeAutoLink(routePath: string[], layoutComponentLists: Component[], routeConfig: { [x: string]: routerConfig }) {
  // console.log(routePath)

  if (!Array.isArray(layoutComponentLists)) throw Error('Should be Array fo LayoutComponents.')

  const removePathParam = (path: string) => path.replace(/\/:[\S]+$/, '')

  const getRoutePath = (val: string) => {
    const _val = val.split('/')
    if (_val.length > 1) {
      return _val[_val.length - 2]
    } else return val.replace(/\.vue$/, '')
  }
  const generatorRoute = (path: string, fullPath: string, config: routerConfig): singleRouteConfig => {
    const route: singleRouteConfig = {
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
  let routes: singleRouteConfig[] = []
  routePath = routePath.map(i => i.replace(/^\.\//, '')).filter(i => isIndex(i.split('/').slice(-2).join('/')))
  routePath.forEach(path => {
    const path_ary = path.split('/')
    let _routes = routes
    const len = path_ary.length
    while (path_ary.length) {
      const _path = path_ary[0]
      const rest_path = path_ary.join('/')
      const foundRoute: singleRouteConfig | undefined = _routes.find(({ path }) => removePathParam(path) == `${_path}`)
      if (foundRoute && foundRoute.name) {
        if (Array.isArray(foundRoute.children)) {
          if (isIndex(rest_path)) {
            foundRoute.children.push(generatorRoute('', path, routeConfig[path]))
            break
          }
        } else {
          //   console.log(foundRoute)
          const index_path = (foundRoute.name as string).split('_').join('/') + '.vue' //复原
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
          _routes = _routes[_routes.length - 1].children || []
        }
      }
      path_ary.shift()
    }
  })
  routes = routes.map(i => ({ ...i, path: '/' + i.path }))
  return function toCompoennt(importFn: DescribableFunction, routeLists?: singleRouteConfig[]): RouteRecordRaw[] {
    if (!routeLists) routeLists = routes
    return routeLists.map(i => {
      let children:RouteRecordRaw[] = []
      if (i.children && i.children.length > 0) children = toCompoennt(importFn, i.children)
      return { ...i, children,component: typeof i.component === 'string' ? importFn(i.component) : i.component }
    })
  }
}

export function filePathToNest(routePath: string[], config: { [x: string]: routerConfig }): navRouteConfig[] {
  const pathList: string[][] = routePath.filter(i => isIndex(i.split('/').slice(-2).join('/'))).map(i => i.replace(/^\.\//, '').split('/'))

  const generator = (path: string[]): string[] => {
    if (path.length == 1) return path.map(i => i.replace(/\.vue$/, ''))
    return path[path.length - 1] === 'index.vue' || path[path.length - 1].toLowerCase() === path[path.length - 2].toLowerCase() + '.vue' ? path.slice(0, path.length - 1) : path
  }
  let idx = -1
  // console.log(pathList)

  const navConfig2: Map<string, navRouteConfig> = new Map()
  while (idx++ < pathList.length - 1) {
    const realpath = pathList[idx].join('/')
    const path = generator(pathList[idx])
    if (path.length > 1) {
      if (!navConfig2.get(path[0])) navConfig2.set(path[0], { path: path[0], title: config[realpath]?.meta?.title ?? path[0], children: [] })
      const parent_key = path.slice(0, path.length - 1).join('/')
      if (!navConfig2.get(parent_key)) navConfig2.set(parent_key, { path: parent_key, title: config[realpath]?.meta?.title ?? parent_key.replace('/', '_'), children: [] })
    }
    navConfig2.set(path.join('/'), { path: path.join('/'), title: config[realpath]?.meta?.title ?? path.join('_'), children: [] })
  }
  // console.log(navConfig2)

  const ans: navRouteConfig[] = []
  for (const pathString of navConfig2.keys()) {
    const path: string[] = generator(pathString.split('/'))
    if (path.length == 0) continue
    const key = path.join('/')
    const currRouter = navConfig2.get(key)
    if (!currRouter) continue
    if (path.length == 1) ans.push(currRouter)
    else {
      const _key = path.slice(0, path.length - 1).join('/')
      const pid = navConfig2.get(_key)
      if (pid !== undefined) pid.children.push(currRouter)
    }
  }
  // console.log(ans)
  return ans
}
