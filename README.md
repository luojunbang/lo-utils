### checkIsFirstEntry(flagKey?)
 * 检查是否首次访问
 * @returns - Promise<Boolean>


### copyText(val)
 * 复制文本
 * @param val - text


### dataURLtoFile(dataurl, filename)
 * dataURLtoFile
 * @param dataurl - 
 * @param filename - 
 * @returns 


### debounce(func, wait?, immediate?)
 * 防抖
 * @param func - callback
 * @param wait - time(ms)
 * @param immediate - is call immediate


### deepPriority(root, fn, fields?)
 * 深度优先遍历
 * @param root - target Tree
 * @param fn - callback if return truely, it break
 * @param fields - default as 'children' for children key,'id' for unique key


### exclude(undefined)
 * exclude some fields and return a new object
 * @param obj - 
 * @param keys - 
 * @returns 


### FlattenTreeDeepFirst(root, fields?)
 * 深度遍历扁平化
 * @param root - target tree
 * @param fields - default as 'children' for children key,'id' for unique key


### FlattenTreeWildFirst(root, fields?)
 * 深度遍历
 * @param root - target tree
 * @param fields - default as 'children' for children key,'id' for unique key


### fmtContentLength(val)
 * 格式化内容长度
 * @param val - formater value


### fmtDate(date, splitter?)
 * 格式化日期
 * @param Date - 日期
 * @param splitter - 默认-
 * @example
 * fmtDate('2020-01-01') == '2020-01-01' fmtDate('2020-01-01','') == '20200101' fmtDate('2020-01-01','a') == '2020a01a01'


### fmtDateTime(date)
 * 格式化日期时间星期(y:年 m:月 d:日 h:小时 i:分钟 s:秒 a:星期 w:第几周)
 * @param date - 日期
 * @param formatter - 格式
 * @example
 * generatorDate('2020-01-01') == '2020-01-01 00:00:00 五' generatorDate('2020-01-01','ymdhis 星期a 第w周') == '20200101000000 星期五 第w周'


### fmtDay(date)
 * 返回中文星期几
 * @param date - input


### fmtEmptyVal(val, target?)
 * 格式化空白文本 null undefind ''
 * @param val - formater value


### fmtNum(val, fixed?, currency?)
 * 根据本地语言格式化数字
 * @param val - formatter value
 * @param fixed - 小数点后位数
 * @param currency - 是否增加货币符号
 * @returns 


### fmtStorageSize(val, unit?)
 * 格式化存储大小
 * @param val - The val to transform ,default unit is b,Only accept 2b 2k 2m 2g 2t 2p
 * @param unit - accept targetUnit ex.'k','K','Kb'
 * @example
 * ('2048K','m') returns '2m'


### fmtTime(date, splitter?)
 * 格式化时间
 * @param Date - 日期
 * @param splitter - 默认:
 * @example
 * fmtTime('2020-01-01') == '00:00:00' fmtTime('2020-01-01','') == '000000' fmtTime('2020-01-01',' ') == '00 00 00'


### fmtWeek(date)
 * 返回第几周
 * @param date - input


### generatorDate(date, formatter?)
 * 格式化日期时间星期(y:年 m:月 d:日 h:小时 i:分钟 s:秒 a:星期 w:第几周 e:毫秒)
 * @param date - 日期
 * @param formatter - 格式
 * @example
 * generatorDate('2020-01-01') == '2020-01-01 00:00:00 五' generatorDate('2020-01-01','ymdhis 星期a 第w周') == '20200101000000 星期五 第w周'


### generatorFile(fileName, blob, fileType?)
 * 文件流转化为文件
 * @param fileName - filename
 * @param blob - file arraybuffer
 * @param fileType - file type such as (xls,zip,pdf) or the original fileType in mdn


### generatorFileAxios(res, fileName?, type?)
 * axios下载文件封装
 * @param res - axios response
 * @param fileName - custom filename or request header filename
 * @param type - file type such as (xls,zip,pdf) or the original fileType in mdn


### getLabelWidth(label, fontSize?)
 * 计算label的长度 三个数组字母==两个文字
 * @param label - text
 * @param fontSize - font size


### getParams(url)
 * 从url获取参数
 * @example
 * getParams('github.com?a=1') == \{a:1\}


### getScrollbarWidth()
 * 获取滚动条宽度


### isDef(val)
 * Whether the text is not 'null,undefined?
 * @param val - value


### isEmpty(val)
 * Whether the text is '',null,undefined?
 * @param val - value


### isInt(text)
 * Whether the text is an Non-negative integer?
 * @param val - text


### isIpv4(val)
 * Whether the text is an ip ?
 * @param val - text


### isJSType(val, target)
 * Whether the input is js type?
 * @param val - value
 * @param target - javascript type


### isMacAddress(val)
 * Whether the text is an mac address ?
 * @param val - text


### isNil(val)
 * Whether the text is 'null,undefined?
 * @param val - value


### isNotEmptyText(val)
 * Whether the text is not '',null,undefined?
 * @param val - value


### isPercent(text)
 * Whether the text is an 0-100 float?
 * @param val - text


### isPort(text)
 * Whether the text is an network port?
 * @param val - text


### isPositiveFloat(text)
 * Whether the text is an Non-negative float?
 * @param val - text


### isSecondTimeBigger(first, last)
 * 比较时间,第二参数时间戳比第一参数时间戳大
 * @param first - 第一个参数
 * @param last - 第二个参数
 * @example
 * isSecondTimeBigger('2020-01-01','2020-01-02') == true


### jsonp(url, params?)
 * jsonp
 * @param url - url
 * @param params - params
 * @returns - Promise


### opt2fmt(undefined)
 * 数组选项转换为格式化对象
 * @param options - 选项
 * @example
 * [\{label:'label',value:'value'\}] returns \{value:'label'\}


### opt2fmtFn(undefined)
 * 数组选项转换为格式化函数
 * @param options - 选项
 * @returns a formatter function return the label for the value


### parseFileName(contentDispotion)
 * 根据请求头转换文件名
 * @param contentDispotion - request header attribute


### parseParams(params, url?)
 * 拼接url与参数,skip undefined and null
 * @example
 * parseParams(\{a:1\},'github.com') == github.com?a=1


### parseToPx(val)
 * 像素单位转换
 * @param val - target
 * @example
 * 100 returns 100px,100vw returns 100vw,100% returns 100%


### pick(undefined)
 * pick some fields and return a new object
 * @param obj - 
 * @param keys - 
 * @returns 


### r(x?)
 * 生成随机字符串
 * @param x - 位数


### t(wait, args)
 * 等待n秒
 * @param x - second


### throttle(func, wait?)
 * 节流
 * @param func - callback
 * @param wait - time(ms)


### timeString(date)
 * 返回时间字符串 20001010123030
 * @param date - input


### wildPriority(root, fn, fields?)
 * 广度优先遍历
 * @param root - target tree
 * @param fn - callback if return truely, it break
 * @param fields - default as 'children' for children key,'id' for unique key

