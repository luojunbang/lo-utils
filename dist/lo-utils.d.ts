import { Component } from 'vue'
import { RouteComponent } from 'vue-router'
import { RouteMeta } from 'vue-router'
import { RouteRecordName } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

/**
 * @description 格式化日期时间星期(y:年 m:月 d:日 h:小时 i:分钟 s:秒 a:星期 w:第几周)
 * @param {String} date
 * @param {String} formatter y-m-d h:i:s a
 * @example
 * ```js
 *    generatorDate('2020-01-01') == '2020-01-01 00:00:00 五'
 *    generatorDate('2020-01-01','ymdhis 星期a 第w周') == '20200101000000 星期五 第w周'
 * ```
 */
declare type dataTramsformOrigin = Date | string | number

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

/**
 * @description 格式化日期
 * @param {String} Date
 * @param {String} splitter  '-'
 * @example
 * ```js
 *    fmtDate('2020-01-01') == '2020-01-01'
 *    fmtDate('2020-01-01','') == '20200101'
 *    fmtDate('2020-01-01',' ') == '2020 01 01'
 * ```
 */
export declare function fmtDate(date: dataTramsformOrigin, splitter?: string): string

/**
 * @description 跟generatorData一样
 */
export declare function fmtDateTime(date: dataTramsformOrigin, formatter: string): string

/**
 * @description 格式化时间
 * @param {String} Date
 * @param {String} splitter  ':'
 * @example
 * ```js
 *    fmtTime('2020-01-01') == '00:00:00'
 *    fmtTime('2020-01-01','') == '000000'
 *    fmtTime('2020-01-01',' ') == '00 00 00'
 * ```
 */
export declare function fmtTime(date: dataTramsformOrigin, splitter?: string): string

export declare function generatorDate(date: dataTramsformOrigin, formatter?: string): string

/**
 * @description 比较时间,第二参数时间戳比第一参数时间戳大
 * @param {String} first
 * @param {String} last
 * @returns {Boolean}
 * @example
 * ```js
 *    isSecondTimeBigger('2020-01-01','2020-01-02') == true
 * ```
 */
export declare function isSecondTimeBigger(first: dataTramsformOrigin, last: dataTramsformOrigin): boolean

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