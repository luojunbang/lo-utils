
# lo-utils

## 安装

```sh
npm i lo-utils --save
```

## 使用
```js
import { fmtDate } from 'lo-utils'
```

## 公共样式说明

### 导入
```js
import 'YOUR_VARIABLES.scss' //具体变量名称见 'lo-utils/style/base/_variables.scss'
import 'lo-utils/style/index.scss';
```

### 边距 (mg | pd)-(大小)-(方向)
* 大小：base(可无) | lg | sm | xs
* 方向：t | r | b | l | lr(左右) | tb(上下)
* 其他：mg0auto(margin:0 auto)

例如：左方基础外边距,:class="mg-l"左方大外边距:class="mg-l-lg",左右小内边距 class="pd-lr-sm"

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
*  日期格式化工具
### generatorDate 
* description  格式化日期时间星期(y:年 m:月 d:日 h:小时 i:分钟 s:秒 a:星期)  
* param {String} date  
* param {String} formatter y-m-d h:i:s a  
* example
```js
generatorDate('2020-01-01') == '2020-01-01 00:00:00 五'
generatorDate('2020-01-01','ymdhis 星期a') == '20200101000000 星期五'
``` 

### fmtDate 
* description 格式化日期  
* param {String} Date  
* param {String} splitter  '-'  
* example
```js
fmtDate('2020-01-01') == '2020-01-01'
fmtDate('2020-01-01','') == '20200101'
fmtDate('2020-01-01','') == '20200101'
``` 

### fmtTime 
* description 格式化时间  
* param {String} Date  
* param {String} splitter  ':'  
* example
```js
fmtDate('2020-01-01') == '00:00:00'
fmtDate('2020-01-01','') == '000000'
fmtDate('2020-01-01',' ') == '00 00 00'
``` 

### fmtDateTime 
* description 跟generatorData一样 

### isSecondTimeBigger 
* description 比较时间,第二参数时间戳比第一参数时间戳大  
* param {String} first  
* param {String} last  
* returns {Boolean}  
* example
```js
isSecondTimeBigger('2020-01-01','2020-01-02') == true
``` 




## fileHandler.js
*  文件工具
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
``` 

### getFileSilent 
* description 静默iframe导出文件  
* param url 请求地址 




## helper.js
*  工具
### checkIsFirstEntry 
* description  检查是否首次访问  
* example
```js
checkIsFirstEntry(KEY?).then(val=>{}).catch(_=>{})
``` 




## urlHandler.js
*  工具
### parseParams 
* param {} params  
* param {} url  
* returns 

### getParams 
* param {} params  
* param {} url  
* returns 




## utils.js
*  工具
 * * @param {*} params * @param {*} url * @returns */


## validator.js
*  工具
### isIpv4 
* description  
* param {String} val  
* returns {Boolean} 

### isMacAddress 
* description  
* param {String} val  
* returns {Boolean} 

### isPositiveFloat 
* description 金额 等  
* param {String|Number} val  
* returns {Boolean} 

### isInt 
* description  
* param {String|Number} val  
* returns {Boolean} 

### isPercent 
* description 百分率 0-100  
* param {String|Number} val  
* returns {Boolean} 

### isPort 
* description 端口 0-65535  
* param {String|Number} val  
* returns {Boolean} 

### isJSType 
* description  
* param {} val  
* param {String} target  
* returns {Boolean} 

### isEmpty 
* description  
* param {} val  
* returns {Boolean} 

### isNotEmptyText 
* description  
* param {} val  
* returns {Boolean} 




