import { Component } from 'vue';
import { RouteRecordRaw, RouteMeta, RouteRecordName, RouteComponent } from 'vue-router';
interface navRouteConfig {
    path: string;
    title: string;
    children: navRouteConfig[];
}
interface routerConfig {
    meta?: {
        title?: string;
    };
    params?: string;
}
interface singleRouteConfig {
    path: string;
    component: string | RouteComponent | null | undefined;
    name?: RouteRecordName;
    meta?: RouteMeta;
    redirect?: string;
    children?: singleRouteConfig[] | undefined;
}
declare type DescribableFunction = {
    description: string;
    (someArg: string): RouteComponent | (() => Promise<RouteComponent>);
};
export declare function routeAutoLink(routePath: string[], layoutComponentLists: Component[], routeConfig: {
    [x: string]: routerConfig;
}): (importFn: DescribableFunction, routeLists?: singleRouteConfig[]) => RouteRecordRaw[];
export declare function filePathToNest(routePath: string[], config: {
    [x: string]: routerConfig;
}): navRouteConfig[];
export {};
//# sourceMappingURL=routerImport.d.ts.map