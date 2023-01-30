// 工具

/**
 * @description
 * @param {String} val
 * @returns {Boolean}
 */
export function isIpv4(val: string): boolean {
  const ary = val.split('.')
  return ary.length === 4 && ary.every(i => i !== '' && /^([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])$/.test(i))
}

/**
 * @description
 * @param {String} val
 * @returns {Boolean}
 */
export function isMacAddress(val: string): boolean {
  const ary = val.split(':')
  return ary.length === 6 && ary.every(i => /^[\dabcdefABCDEF]{2}$/.test(i))
}

/**
 * @description 金额 等
 * @param {String|Number} val
 * @returns {Boolean}
 */
export function isPositiveFloat(text: string | number): boolean {
  return /^[1-9][0-9]*(.[0-9]{1,2})?$/.test(text.toString()) || /^[0]{1}(.[0]{1,2})?$/.test(text.toString())
}

/**
 * @description
 * @param {String|Number} val
 * @returns {Boolean}
 */
export function isInt(text: string | number): boolean {
  if (isUndef(text)) return false
  return /^(0|[1-9][0-9]*)$/.test(text.toString())
}

//
/**
 * @description 百分率 0-100
 * @param {String|Number} val
 * @returns {Boolean}
 */
export function isPercent(text: string | number): boolean {
  return (/^[1-9][0-9]*(.[0-9]{1,2})?$/.test(text.toString()) && parseFloat(text.toString()) <= 100) || /^[0]{1}(.[0-9]{1,2})?$/.test(text.toString())
}

/**
 * @description 端口 0-65535
 * @param {String|Number} val
 * @returns {Boolean}
 */
export function isPort(text: string | number): boolean {
  return (/^[1-9][0-9]*$/.test(text.toString()) && Math.floor(+text) <= 65535) || /^0$/.test(text.toString())
}

/**
 * @description
 * @param {*} val
 * @param {String} target
 * @returns {Boolean}
 */
export function isJSType(val: any, target: string): boolean {
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
export function isEmpty(val: any): boolean {
  return val === null || val === ''
}

/**
 * @description
 * @param {*} val
 * @returns {Boolean}
 */
export function isNotEmptyText(val: any): boolean {
  return val !== null && val !== '' && val !== undefined
}

export function isUndef(val: any) {
  return val === null || val === undefined
}

export function isDef(val: any) {
  return val === null || val === undefined
}
