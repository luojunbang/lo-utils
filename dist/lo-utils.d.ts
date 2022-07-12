import { Component } from 'vue'
import { RouteComponent } from 'vue-router'
import { RouteMeta } from 'vue-router'
import { RouteRecordName } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

declare type DescribableFunction = {
  description: string
  (someArg: string): RouteComponent | (() => Promise<RouteComponent>)
}

export declare function filePathToNest(
  routePath: string[],
  config: {
    [x: string]: routerConfig
  }
): navRouteConfig[]

declare interface navRouteConfig {
  path: string
  title: string
  children: navRouteConfig[]
}

export declare function routeAutoLink(
  routePath: string[],
  layoutComponentLists: Component[],
  routeConfig: {
    [x: string]: routerConfig
  }
): (importFn: DescribableFunction, routeLists?: singleRouteConfig[]) => RouteRecordRaw[]

declare interface routerConfig {
  meta?: {
    title?: string
  }
  params?: string
}

declare interface singleRouteConfig {
  path: string
  component: string | RouteComponent | null | undefined
  name?: RouteRecordName
  meta?: RouteMeta
  redirect?: string
  children?: singleRouteConfig[] | undefined
}

export {}
