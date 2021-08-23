function isIpv4(val) {
  const ary = val.split('.')
  return ary.length === 4 && ary.every(i => i !== '' && /^([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])$/.test(i))
}

function isMacAddress(val) {
  const ary = val.split(':')
  return ary.length === 6 && ary.every(i => /^[\dabcdefABCDEF]{2}$/.test(i))
}

//金额 等
function isPositiveFloat(text) {
  return /^[1-9][0-9]*(.[0-9]{1,2})?$/.test(text) || /^[0]{1}(.[0]{1,2})?$/.test(text)
}

function isInt(text) {
  return /^(0|[1-9][0-9]*)$/.test(text)
}

// 百分率 0-100
function isPercent(text) {
  return (/^[1-9][0-9]*(.[0-9]{1,2})?$/.test(text) && parseFloat(text) <= 100) || /^[0]{1}(.[0-9]{1,2})?$/.test(text)
}

// 端口 0-65535
function isPort(text) {
  return (/^[1-9][0-9]*$/.test(text) && Math.floor(text) <= 65535) || /^0$/.test(text)
}

function isJSType(val, target) {
  return (
    Object.prototype.toString
      .call(val)
      .replace(/^\[object ([a-zA-Z]*)\]$/, '$1')
      .toLowerCase() === target.toLowerCase()
  )
}

function isEmpty(val) {
  return val === null || val === ''
}

function isNotEmptyText(val) {
  return val !== null && val !== '' && val !== undefined
}

module.exports = {
  isIpv4,
  isMacAddress,
  isPositiveFloat,
  isPercent,
  isPort,
  isJSType,
  isEmpty,
  isNotEmptyText,
  isInt,
}
