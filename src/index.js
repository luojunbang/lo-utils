const dateHandler = require('./extend/dateHandler')
const urlHandler = require('./extend/urlHandler')
const fileHandler = require('./extend/fileHandler')
const validator = require('./extend/validator')
module.exports = {
  parseJSONstringify,
  debounce,
  throttle,
  fmtNum,
  getLabelWidth,
  fmtUndefind,
  fmtEmptyVal,
  copyText,
  fmtStorageSize,
  fmtContentLength,
  fmtContentType,
  //
  ...dateHandler,
  //
  ...fileHandler,
  //
  ...validator,
  //
  ...urlHandler,
}
const { isEmpty, isJSType, isInt } = validator

/**
 *
 * @param {Function} func
 * @param {Number} wait
 * @returns {*}
 */

function throttle(func, wait = 500) {
  let ctx, args, res, lastTime
  const handle = _ => {
    lastTime = Date.now()
    res = func.call(ctx, ...args)
    ctx = args = null
  }
  return function () {
    !lastTime && (lastTime = Date.now())
    args = arguments
    ctx = this
    if (Date.now() - lastTime > wait) handle()
    return res
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
function debounce(func, wait = 300, immediate = false) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function (...argument) {
    context = this
    args = argument
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

function fmtNum(val) {
  // toDo...
  return val
}

// 计算label的长度 三个数组字母==两个文字
function getLabelWidth(label, fontSize = 14) {
  let minWidth = 2 * fontSize,
    res = minWidth
  if (!label) return minWidth
  if (label.length) {
    const az09AryLength = label.split('').filter((i) => /[0-9A-Za-z()%]/.test(i)).length
    res = Math.ceil((az09AryLength * fontSize * 2) / 3) + (label.length - az09AryLength) * fontSize
  }
  return Math.max(minWidth, res)
}

function fmtUndefind(val) {
  if (val === undefined || val === null) return '-'
  return val
}

function fmtEmptyVal(val, target = '-') {
  if (isEmpty(val)) return target
  return val
}

function copyText(val) {
  if (!isJSType(val, 'string') || document) return false
  var oInput = document.createElement('input')
  oInput.value = val
  document.body.appendChild(oInput)
  oInput.select() // 选择对象
  document.execCommand('Copy') // 执行浏览器复制命令
  oInput.style.display = 'none'
  document.body.removeChild(oInput)
  return true
}

function parseJSONstringify(string) {
  // json
  let lastIndex = 0,
    start = string.indexOf('"{', lastIndex),
    end = string.indexOf('}"', start)
  while (start != -1) {
    string = string.slice(0, start) + '"' + string.slice(start + 1, end + 1).replace(/"/g, '\\"') + string.slice(end + 1)
    lastIndex = end
    start = string.indexOf('"{', lastIndex)
    end = string.indexOf('}"', start)
  }
  // xml
  lastIndex = 0
  start = string.indexOf('"<', lastIndex)
  end = string.indexOf('>"', start)
  while (start != -1) {
    string = string.slice(0, start) + '"' + string.slice(start + 1, end + 1).replace(/"/g, '\\"') + string.slice(end + 1)
    lastIndex = end
    start = string.indexOf('"<', lastIndex)
    end = string.indexOf('>"', start)
  }

  let res = null
  try {
    res = JSON.parse(string)
  } catch (err) {
    console.log('err.', err)
  }
  return res
}

/**
 * @description formater size display
 * @example ('2048K','m') -> '2m'
 * @param {String｜Number } val The val to transform ,default unit is b,Only accept 2b 2k 2m 2g 2t 2p
 * @param {String} unit accept targetUnit ex.'k','K','Kb'
 * @returns {String} The val after transform
 */
function fmtStorageSize(val, unit) {
  const UNIT = 'bkmgtp'.split('')
  val = val.toString().toLowerCase()
  let size = parseFloat(val, 10),
    originUnit = 'b'

  if (isNaN(size)) throw new Error('Require a right input')
  if (/[bkmgtp]/.test(val)) originUnit = val.replace(/^[0-9.]+([bkmgtp]{1})$/g, '$1')
  let res = size * Math.pow(1024, UNIT.indexOf(originUnit)), //tranform size with unit b
    unitIdx = 0
  if (unit) {
    if (isJSType(unit, 'string') && UNIT.indexOf(unit[0].toLowerCase()) != -1) {
      let targetUnitIdx = UNIT.indexOf(unit[0].toLowerCase())
      res = res * Math.pow(1024, 0 - targetUnitIdx)
    } else throw new Error('Require the correct transform unit')
  } else {
    while (res.toFixed(0).length > 3) {
      res = res / 1024
      unitIdx++
    }
  }
  res = isInt(res) ? res : res.toFixed(1)
  return res + (unit ? unit : UNIT[unitIdx])
}

function fmtContentLength(val) {
  const UNIT = 'BKMGTP'
  let res = +val
  let unitIdx = 0
  while (res.toFixed(0).length > 3) {
    res = res / 1000
    unitIdx++
  }
  return (isInt(res) ? res : res.toFixed(1)) + UNIT[unitIdx]
}

function fmtContentType(val) {
  val = val.toLowerCase()
  const type = val.split('/')[1]
  const config = {
    plain: 'txt',
    'svg+xml': 'svg',
    javascript: 'js',
    jpeg: 'jpg',
  }
  return config[type] || type
}
