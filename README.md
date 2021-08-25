
# lo-utils

## 安装

```sh
npm i lo-utils --save
```

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
* description 比较事件,第二参数时间戳比第一参数时间戳大  
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
* example  checkIsFirstEntry(KEY?).then(val=>{}).catch(_=>{}) 




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
* param {} val  
* returns 

### isMacAddress 
* description  
* param {} val  
* returns 

### isPositiveFloat 
* description 金额 等  
* param {} val  
* returns 

### isInt 
* description  
* param {} val  
* returns 

### isPercent 
* description 百分率 0-100  
* param {} val  
* returns 

### isPort 
* description 端口 0-65535  
* param {} val  
* returns 

### isJSType 
* description  
* param {} val  
* returns 

### isEmpty 
* description  
* param {} val  
* returns 

### isNotEmptyText 
* description  
* param {} val  
* returns 




