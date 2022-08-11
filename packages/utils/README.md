
# lo-utils

## 安装

```sh
npm i lo-utils --save
```

## 使用
```js
import { fmtDate } from 'lo-utils'
```
## 工具函数
* dateHandler.js

 日期格式化工具
* fileHandler.js

 文件工具
* formatter.js

 格式化
* helper.js

 工具
* index.js

[export](#export) * [from](#from) '.[dateHandler](#dateHandler)'[export](#export) * [from](#from) '.[fileHandler](#fileHandler)'[export](#export) * [from](#from) '.[formatter](#formatter)'[export](#export) * [from](#from) '.[helper](#helper)'[export](#export) * [from](#from) '.[treeHandler](#treeHandler)'[export](#export) * [from](#from) '.[urlHandler](#urlHandler)'[export](#export) * [from](#from) '.[utils](#utils)'[export](#export) * [from](#from) '.[validator](#validator)'
* treeHandler.js

 树遍历
* urlHandler.js

 工具
* utils.js

 工具[import](#import) { [isJSType](#isJSType) } [from](#from) '.[validator](#validator)'
* validator.js

 工具


## 公共样式说明

### 导入
```js
import 'YOUR_VARIABLES.scss' //具体变量名称见 'lo-utils/style/base/_variables.scss'
import 'lo-utils/style/index.scss';
```

### 颜色 color-(颜色)
* 基础颜色：primary｜success｜warn｜danger｜highlight
* 文字颜色：title｜text｜subtext｜placeholder

### 边距 (mg | pd)-(大小)-(方向)
* 大小：base(可无) | lg | sm | xs
* 方向：t | r | b | l | lr(左右) | tb(上下)
* 其他：mg0auto(margin:0 auto)

例如：左方基础外边距:class="mg-l",左方大外边距:class="mg-l-lg",左右小内边距 class="pd-lr-sm"

### 定位
* 定位：relative | absolute | fixed
* 类名：row-center | col-center | {(left | middle | right)-(t | m | b)} | full

例如：一行垂直居中对齐 class="middle-m"

### flex布局
* 布局：flex-(row | column)-(reverse?) | flex-row-nowrap(flex-row align-center justify-center)
* 横向：justify-(start | end | center | between | around)
* 垂直：align-(start | end | center | stretch)
* 自身：self-(start | end | center | stretch)

例如：一行垂直居中对齐 class="flex-row align-center justify-center"

### 文字 text
* 大小：base(可无)｜lg｜sm
* 行高：[lh] text-lh-(lg[2] | sm[1.2] | [1.5])
* 粗细：text-(bold | light)
* 对齐：text-(left | right | center)
* 其他：text-(ABC | Abc | abc | cut[超过省略号] | 2cut[两行超过省略号])
* 下划线 underline

### 瞄边 border
* border-(base | t | r | b | l)-(none?)
## dateHandler.js
### generatorDate 
* description 格式化日期时间星期(y:年 m:月 d:日 h:小时 i:分钟 s:秒 a:星期 w:第几周)  
* param {String} date  
* param {String} formatter y-m-d h:i:s a  
* example
```js
generatorDate('2020-01-01') == '2020-01-01 00:00:00 五'
generatorDate('2020-01-01','ymdhis 星期a 第w周') == '20200101000000 星期五 第w周'
``` export 

### fmtDate 
* description 格式化日期  
* param {String} Date  
* param {String} splitter  '-'  
* example
```js
fmtDate('2020-01-01') == '2020-01-01'
fmtDate('2020-01-01','') == '20200101'
fmtDate('2020-01-01',' ') == '2020 01 01'
``` export 

### fmtTime 
* description 格式化时间  
* param {String} Date  
* param {String} splitter  ':'  
* example
```js
fmtTime('2020-01-01') == '00:00:00'
fmtTime('2020-01-01','') == '000000'
fmtTime('2020-01-01',' ') == '00 00 00'
``` export 

### fmtDateTime 
* description 跟generatorData一样 export 

### isSecondTimeBigger 
* description 比较时间,第二参数时间戳比第一参数时间戳大  
* param {String} first  
* param {String} last  
* returns {Boolean}  
* example
```js
isSecondTimeBigger('2020-01-01','2020-01-02') == true
``` export 




## fileHandler.js
### downloadFile 
* description  从URL里下载文件  
* param {String} fileName 文件名  
* param {String} data 文件流  
* param {String} dataType 文件类型  
* example
```js
dataType
zip:'applicationzip;charset=utf-8
xls:'applicationvnd.ms-excel;charset=UTF-8'
xlsx:TODO
``` export 

### getFileSilent 
* description  静默iframe导出文件  
* param url 请求地址 export 




## formatter.js
### fmtNum 
* param {} val  
* returns export 

### fmtUndefined 
* param {} val  
* returns export 

### fmtEmptyVal 
* param {} val  
* returns export 

### fmtStorageSize 
* description formatter size display  
* param {String｜Number } val The val to transform ,default unit is b,Only accept 2b 2k 2m 2g 2t 2p  
* param {String} unit accept targetUnit ex.'k','K','Kb'  
* returns {String} The val after transform  
* example
```js
('2048K','m') -> '2m'
``` export 

### fmtContentLength 
* param {} val  
* returns export 

### fmtContentType 
* param {} val  
* returns export 




## helper.js
### checkIsFirstEntry 
* description  检查是否首次访问  
* example
```js
checkIsFirstEntry(KEY?).then(val=>{}).catch(_=>{})
``` export 




## index.js



## treeHandler.js
### deepFisrt 
* description  深度遍历  
* param {Array} arr  
* returns {Array} export 

### wildFirst 
* description  广度遍历  
* param {Array} arr  
* returns {Array} export 




## urlHandler.js
### parseParams 
* description  拼接url与参数  
* example
```js
parseParams({a:1},'github.com') == github.com?a=1
``` export 

### getParams 
* description  从url获取参数  
* example
```js
getParams('github.com?a=1') == {a:1}
``` export 




## utils.js
### throttle 
* param {Function} func  
* param {Number} wait  
* returns {} export 

### debounce 
* param {Function} func  
* param {number} wait  
* param {boolean} immediate  
* return {} export 

### getLabelWidth 
* description 计算label的长度 三个数组字母==两个文字  
* param {} label  
* param {} fontSize  
* returns export 

### copyText 
* param {} val  
* returns export 

### getScrollbarWidth 
* description 获取滚动条宽度  
* returns Number  export 




## validator.js
### isIpv4 
* description  
* param {String} val  
* returns {Boolean} export 

### isMacAddress 
* description  
* param {String} val  
* returns {Boolean} export 

### isPositiveFloat 
* description 金额 等  
* param {String|Number} val  
* returns {Boolean} export 

### isInt 
* description  
* param {String|Number} val  
* returns {Boolean} export 

### isPercent 
* description 百分率 0-100  
* param {String|Number} val  
* returns {Boolean} export 

### isPort 
* description 端口 0-65535  
* param {String|Number} val  
* returns {Boolean} export 

### isJSType 
* description  
* param {} val  
* param {String} target  
* returns {Boolean} export 

### isEmpty 
* description  
* param {} val  
* returns {Boolean} export 

### isNotEmptyText 
* description  
* param {} val  
* returns {Boolean} export 




