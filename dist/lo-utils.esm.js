// 日期格式化工具
function generatorDate(date, formatter = 'y-m-d h:i:s') {
    let res = 'Invalid Date';
    if (!date)
        return res;
    if (Object.prototype.toString.call(date) === '[object Date]') ;
    else if (/^[0-9]{0,13}$/.test(date.toString())) {
        if (/^[0-9]{10}$/.test(date.toString())) {
            // 对于秒数做一个处理
            date += '000';
        }
        date = new Date(Math.floor(+date));
    }
    else if (typeof date === 'string') {
        date = date.replace(new RegExp(/-/gm), '/'); //IOS
    }
    const d = new Date(date);
    if (d.toString() === 'Invalid Date')
        return res;
    const getWeek = (d) => {
        const day1 = new Date(d.getFullYear(), 0, 1);
        const day1week = day1.getDay();
        const dis = d.getTime() - day1.getTime() - (day1week == 0 ? 0 : 86400000 * (7 - day1week));
        if (dis < 0) {
            return getWeek(new Date(d.getFullYear() - 1, 11, 31));
        }
        return Math.floor(dis / 86400000 / 7) + 1;
    };
    const formatObj = {
        y: d.getFullYear(),
        m: d.getMonth() + 1,
        d: d.getDate(),
        h: d.getHours(),
        i: d.getMinutes(),
        s: d.getSeconds(),
        a: ['日', '一', '二', '三', '四', '五', '六'][d.getDay()],
        w: getWeek(d),
    };
    res = formatter;
    Object.keys(formatObj).forEach(key => {
        const reg = new RegExp(`${key}{1}`, 'g');
        res = res.replace(reg, key === 'a' || key === 'w' ? formatObj[key] : formatObj[key].toString().padStart(2, '0') // 星期不填充0
        );
    });
    return res;
}
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
function fmtDate(date, splitter = '-') {
    return generatorDate(date, `y${splitter}m${splitter}d`);
}
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
function fmtTime(date, splitter = ':') {
    return generatorDate(date, `h${splitter}i${splitter}s`);
}
/**
 * @description 跟generatorData一样
 */
function fmtDateTime(date, formatter) {
    return generatorDate(date, formatter);
}
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
function isSecondTimeBigger(first, last) {
    return generatorDate(last) > generatorDate(first);
}

// 判断是否是index.vue或者 */DIR/DIR.vue 不区分大小写
const isIndex = (path) => {
    if (!path)
        return false;
    const _path = path.replace(/^\.\//, '').split('/');
    if (_path.length == 1)
        return /\.vue$/.test(path);
    else if (_path.length == 2) {
        const [dir, name] = _path.slice(-2);
        return dir.toLowerCase() + '.vue' === name.toLowerCase() || name.toLowerCase() === 'index.vue';
    }
    else
        return false;
};
function routeAutoLink(routePath, layoutComponentLists, routeConfig) {
    // console.log(routePath)
    if (!Array.isArray(layoutComponentLists))
        throw Error('Should be Array fo LayoutComponents.');
    const removePathParam = (path) => path.replace(/\/:[\S]+$/, '');
    const getRoutePath = (val) => {
        const _val = val.split('/');
        if (_val.length > 1) {
            return _val[_val.length - 2];
        }
        else
            return val.replace(/\.vue$/, '');
    };
    const generatorRoute = (path, fullPath, config) => {
        const route = {
            path: path,
            component: fullPath,
            name: fullPath
                .split('/')
                .join('_')
                .replace(/\.vue$/, ''),
            meta: {},
        };
        if (!config)
            return route;
        if (config.params)
            route.path += (route.path ? '/' : '') + config.params;
        return Object.assign(Object.assign({}, config), route);
    };
    let routes = [];
    routePath = routePath.map(i => i.replace(/^\.\//, '')).filter(i => isIndex(i.split('/').slice(-2).join('/')));
    routePath.forEach(path => {
        const path_ary = path.split('/');
        let _routes = routes;
        const len = path_ary.length;
        while (path_ary.length) {
            const _path = path_ary[0];
            const rest_path = path_ary.join('/');
            const foundRoute = _routes.find(({ path }) => removePathParam(path) == `${_path}`);
            if (foundRoute && foundRoute.name) {
                if (Array.isArray(foundRoute.children)) {
                    if (isIndex(rest_path)) {
                        foundRoute.children.push(generatorRoute('', path, routeConfig[path]));
                        break;
                    }
                }
                else {
                    //   console.log(foundRoute)
                    const index_path = foundRoute.name.split('_').join('/') + '.vue'; //复原
                    foundRoute.children = [generatorRoute('', index_path, routeConfig[index_path])];
                    foundRoute.path = removePathParam(foundRoute.path);
                    if (!layoutComponentLists[len - path_ary.length])
                        throw new Error(`Level ${len - path_ary.length + 1} LayoutComponents is not definded`);
                    foundRoute.component = layoutComponentLists[len - path_ary.length];
                    delete foundRoute.name;
                    if (isIndex(rest_path)) {
                        _routes.push(generatorRoute(getRoutePath(rest_path), path, routeConfig[path]));
                        break;
                    }
                }
                _routes = foundRoute.children;
            }
            else {
                if (isIndex(rest_path)) {
                    _routes.push(generatorRoute(getRoutePath(rest_path), path, routeConfig[path]));
                    break;
                }
                else {
                    if (!layoutComponentLists[len - path_ary.length])
                        throw new Error(`Level ${len - path_ary.length + 1} LayoutComponents is not definded`);
                    _routes.push({ path: `${_path}`, component: layoutComponentLists[len - path_ary.length], children: [] });
                    _routes = _routes[_routes.length - 1].children || [];
                }
            }
            path_ary.shift();
        }
    });
    routes = routes.map(i => (Object.assign(Object.assign({}, i), { path: '/' + i.path })));
    return function toCompoennt(importFn, routeLists) {
        if (!routeLists)
            routeLists = routes;
        return routeLists.map(i => {
            let children = [];
            if (i.children && i.children.length > 0)
                children = toCompoennt(importFn, i.children);
            return Object.assign(Object.assign({}, i), { children, component: typeof i.component === 'string' ? importFn(i.component) : i.component });
        });
    };
}
function filePathToNest(routePath, config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const pathList = routePath.filter(i => isIndex(i.split('/').slice(-2).join('/'))).map(i => i.replace(/^\.\//, '').split('/'));
    const generator = (path) => {
        if (path.length == 1)
            return path.map(i => i.replace(/\.vue$/, ''));
        return path[path.length - 1] === 'index.vue' || path[path.length - 1].toLowerCase() === path[path.length - 2].toLowerCase() + '.vue' ? path.slice(0, path.length - 1) : path;
    };
    let idx = -1;
    // console.log(pathList)
    const navConfig2 = new Map();
    while (idx++ < pathList.length - 1) {
        const realpath = pathList[idx].join('/');
        const path = generator(pathList[idx]);
        if (path.length > 1) {
            if (!navConfig2.get(path[0]))
                navConfig2.set(path[0], { path: path[0], title: (_c = (_b = (_a = config[realpath]) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : path[0], children: [] });
            const parent_key = path.slice(0, path.length - 1).join('/');
            if (!navConfig2.get(parent_key))
                navConfig2.set(parent_key, { path: parent_key, title: (_f = (_e = (_d = config[realpath]) === null || _d === void 0 ? void 0 : _d.meta) === null || _e === void 0 ? void 0 : _e.title) !== null && _f !== void 0 ? _f : parent_key.replace('/', '_'), children: [] });
        }
        navConfig2.set(path.join('/'), { path: path.join('/'), title: (_j = (_h = (_g = config[realpath]) === null || _g === void 0 ? void 0 : _g.meta) === null || _h === void 0 ? void 0 : _h.title) !== null && _j !== void 0 ? _j : path.join('_'), children: [] });
    }
    // console.log(navConfig2)
    const ans = [];
    for (const pathString of navConfig2.keys()) {
        const path = generator(pathString.split('/'));
        if (path.length == 0)
            continue;
        const key = path.join('/');
        const currRouter = navConfig2.get(key);
        if (!currRouter)
            continue;
        if (path.length == 1)
            ans.push(currRouter);
        else {
            const _key = path.slice(0, path.length - 1).join('/');
            const pid = navConfig2.get(_key);
            if (pid !== undefined)
                pid.children.push(currRouter);
        }
    }
    // console.log(ans)
    return ans;
}

export { filePathToNest, fmtDate, fmtDateTime, fmtTime, generatorDate, isSecondTimeBigger, routeAutoLink };
