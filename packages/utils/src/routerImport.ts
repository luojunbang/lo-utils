import { Component } from 'vue'

import { RouteRecordRaw, RouteMeta, RouteRecordName, RouteComponent } from 'vue-router'

export declare interface navRouteConfig {
  path: string
  href: string
  fullPath?: string
  meta?: RouteMeta
  title: string
  children?: navRouteConfig[]
}

interface routerConfig {
  meta?: RouteMeta
  params?: string
}
interface singleRouteConfig {
  path: string
  component: string | Component
  name?: RouteRecordName
  meta?: RouteMeta
  children?: singleRouteConfig[]
}

// 判断是否是index.vue或者 */DIR/DIR.vue 不区分大小写
export const isIndex = (path: string): boolean => {
  if (!path) return false
  const _path = path.replace(/^\.\//, '').split('/')
  if (_path.length == 1) return /\.vue$/.test(path)
  else if (_path.length == 2) {
    const [dir, name] = _path.slice(-2)
    return dir.toLowerCase() + '.vue' === name.toLowerCase() || name.toLowerCase() === 'index.vue'
  } else return false
}

export function routeAutoLink(routePath: string[], layoutComponentLists: Component[], routeConfig: { [x: string]: routerConfig }) {
  if (!Array.isArray(layoutComponentLists)) throw Error('Should be Array fo LayoutComponents.')

  const routerNest: navRouteConfig[] = filePathToNest(routePath, routeConfig).map(route => {
    if (!route.children) {
      return {
        path: route.path,
        title: route.title,
        href: route.href,
        children: [
          {
            path: '',
            href: route.href,
            fullPath: route.fullPath,
            title: route.title,
            meta: route.meta,
          },
        ],
      }
    }
    return route
  })
  const routes: singleRouteConfig[] = (function parseRouterRaw(routeAry: navRouteConfig[], deep) {
    if (!Array.isArray(routeAry)) return []
    return routeAry.map(i => {
      if (!i.fullPath && !layoutComponentLists[deep]) throw Error(`LayoutComponents ${deep} is undefined`)
      const routerRaw: singleRouteConfig = {
        path: i.path,
        component: i.fullPath ?? layoutComponentLists[deep],
        name: i.fullPath?.replace(/(\/|\.)/g, '_'),
        meta: i.meta,
      }
      if (i.children) routerRaw.children = parseRouterRaw(i.children, deep + 1)
      return routerRaw
    })
  })(routerNest, 0)

  return function toCompoennt(importFn: (someArg: string) => RouteComponent | (() => Promise<RouteComponent>), routeLists?: singleRouteConfig[]): RouteRecordRaw[] {
    if (!routeLists) routeLists = routes
    return routeLists.map(i => {
      let children: RouteRecordRaw[] = []
      if (i.children && i.children.length > 0) children = toCompoennt(importFn, i.children)
      return { ...i, children, component: typeof i.component === 'string' ? importFn(i.component) : i.component }
    })
  }
}

export function filePathToNest(routePath: string[], config: { [x: string]: routerConfig }, prefix = ''): navRouteConfig[] {
  const pathList = routePath.filter(i => isIndex(i.split('/').slice(-2).join('/'))).map(i => i.replace(/^\.\//, '').split('/'))
  const ans:Record<string,any> = {}
  let idx = 0
  while (pathList.some(i => i[idx] !== void 0)) {
    pathList.forEach(path => {
      if (!path[idx] || isIndex(path.slice(idx - 1, idx + 1).join('/'))) return // 筛选重复导入 xx/index.vue
      const key = path.slice(0, idx + 1).join('/')
      if (!ans[key]) {
        const obj: navRouteConfig = {
          path: path[idx],
          title: path[idx],
          href: prefix + key,
        }
        if (isIndex(path.slice(idx).join('/'))) {
          obj.fullPath = prefix + path.join('/')
          obj.meta = config[obj.fullPath]?.meta
        }
        obj.title = (obj.meta?.title as string) ?? path[idx]
        ans[key] = obj
      }
    })
    idx++
  }

  const list: navRouteConfig[] = []
  Object.keys(ans).forEach(item => {
    const pathList = item.split('/')
    if (pathList.length == 1) list.push(ans[item])
    else {
      const prePath = pathList.slice(0, pathList.length - 1).join('/')
      if (ans[prePath]) {
        if (Array.isArray(ans[prePath].children)) ans[prePath].children.push(ans[item])
        else ans[prePath].children = [ans[item]]
      }
    }
  })
  return list
}
