// 工具

/**
 * @description
 * @param {String} val
 * @returns {Boolean}
 */
exports.isIpv4 = function (val) {
  const ary = val.split('.')
  return ary.length === 4 && ary.every(i => i !== '' && /^([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])$/.test(i))
}

/**
 * @description
 * @param {String} val
 * @returns {Boolean}
 */
exports.isMacAddress = function (val) {
  const ary = val.split(':')
  return ary.length === 6 && ary.every(i => /^[\dabcdefABCDEF]{2}$/.test(i))
}

/**
 * @description 金额 等
 * @param {String|Number} val
 * @returns {Boolean}
 */
exports.isPositiveFloat = function (text) {
  return /^[1-9][0-9]*(.[0-9]{1,2})?$/.test(text) || /^[0]{1}(.[0]{1,2})?$/.test(text)
}

/**
 * @description
 * @param {String|Number} val
 * @returns {Boolean}
 */
exports.isInt = function (text) {
  return /^(0|[1-9][0-9]*)$/.test(text)
}

//
/**
 * @description 百分率 0-100
 * @param {String|Number} val
 * @returns {Boolean}
 */
exports.isPercent = function (text) {
  return (/^[1-9][0-9]*(.[0-9]{1,2})?$/.test(text) && parseFloat(text) <= 100) || /^[0]{1}(.[0-9]{1,2})?$/.test(text)
}

/**
 * @description 端口 0-65535
 * @param {String|Number} val
 * @returns {Boolean}
 */
exports.isPort = function (text) {
  return (/^[1-9][0-9]*$/.test(text) && Math.floor(text) <= 65535) || /^0$/.test(text)
}

/**
 * @description
 * @param {*} val
 * @param {String} target
 * @returns {Boolean}
 */
exports.isJSType = function (val, target) {
  return (
    Object.prototype.toString
      .call(val)
      .replace(/^\[object ([a-zA-Z]*)\]$/, '$1')
      .toLowerCase() === target.toLowerCase()
  )
}

/**
 * @description
 * @param {*} val
 * @returns {Boolean}
 */
exports.isEmpty = function (val) {
  return val === null || val === ''
}

/**
 * @description
 * @param {*} val
 * @returns {Boolean}
 */
exports.isNotEmptyText = function (val) {
  return val !== null && val !== '' && val !== undefined
}
