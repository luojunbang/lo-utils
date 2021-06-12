/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait = 300, immediate = false) {
  let timeout, args, context, timestamp, result

  const later = function() {
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
  return function(...argument) {
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

export function isIpv4(val) {
  const ary = val.split('.')
  // /^(0|\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/.test(i)
  return ary.length === 4 && ary.every(i => i !== '' && /^([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])$/.test(i))
}

// console.log(isIpv4('192.168.1.-2'))
// new Array(300).fill(0).forEach((_, idx) => {
//   if (!isIpv4(`192.168.1.${idx}`)) console.log(idx)
// })

export function isMacAddress(val) {
  const ary = val.split(':')
  return ary.length === 6 && ary.every(i => /^[\dabcdefABCDEF]{2}$/.test(i))
}

export function checkFileType(val) {
  return val.split('\n').every(i => /^\.[a-zA-Z]+$/.test(i))
}

export function fmtNum(val) {
  // toDo...
  return val
}

// 计算label的长度 三个数组字母==两个文字
export function getLabelWidth(label, fontSize = 14) {
  let minWidth = 2 * fontSize,
    res = minWidth
  if (!label) return minWidth
  if (label.length) {
    const az09AryLength = label.split('').filter(i => /[0-9A-Za-z()%]/.test(i)).length
    res = Math.ceil((az09AryLength * fontSize * 2) / 3) + (label.length - az09AryLength) * fontSize
  }
  return Math.max(minWidth, res)
}

//金额 等
export function isPositiveFloat(text) {
  return /^[1-9][0-9]*(.[0-9]{1,2})?$/.test(text) || /^[0]{1}(.[0]{1,2})?$/.test(text)
}

// 百分率 0-100
export function isPercent(text) {
  return (/^[1-9][0-9]*(.[0-9]{1,2})?$/.test(text) && parseFloat(text) <= 100) || /^[0]{1}(.[0-9]{1,2})?$/.test(text)
}

// 端口 0-65535
export function isPort(text) {
  return (/^[1-9][0-9]*$/.test(text) && Math.floor(text) <= 65535) || /^0$/.test(text)
}

console.log(isPort(-2))
console.log(isPort('02'))
new Array(65536).fill(0).forEach((_, idx) => {
  if (!isPort(idx)) console.log(idx)
})

// 离群因子 正负数字包括小数
export function isLoss(text) {
  return /^[-]?\d+([.]\d+)?$/.test(text)
}

export function fmtUndefind(val) {
  if (val === undefined || val === null) return '-'
  return val
}

//特殊输入转义
export function SaferHTML(data) {
  const result = data.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return result
}

export function isType(val, target) {
  return (
    Object.prototype.toString
      .call(val)
      .replace(/^\[object ([a-zA-Z]*)\]$/, '$1')
      .toLowerCase() === target.toLowerCase()
  )
}

export function copyText(val) {
  if (!isType(val, 'string')) return false
  var oInput = document.createElement('input')
  oInput.value = val
  document.body.appendChild(oInput)
  oInput.select() // 选择对象
  document.execCommand('Copy') // 执行浏览器复制命令
  oInput.style.display = 'none'
  document.body.removeChild(oInput)
  return true
}

export function isEmptyText(val) {
  return val === null || val === '' || val === undefined
}

export function isNotEmptyText(val) {
  return val !== null && val !== ''
}

export function emptyText(val) {
  return isNotEmptyText(val) ? val : '-'
}
export function arrayString2Array(val) {
  let ary = []
  if (!val) return '-'
  try {
    ary = JSON.parse(val)
  } catch (err) {
    return '-'
  }
  if (Array.isArray(ary)) {
    return ary.join(',')
  }
  return '-'
}
export function checkSpecialByVal(val) {
  let reg = /<\/script>|<script>|prompt\(|alert\(|eval\(|[<>'’‘]|\/\/|\\\\|\n/m
  if (reg.test(val)) return false
  return true
}
