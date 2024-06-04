// 工具

/**
 * Whether the text is an ip ?
 * @public
 * @param val - text
 */
export function isIpv4(val: any): boolean {
  const ary = val.split('.')
  return ary.length === 4 && ary.every((i) => i !== '' && /^([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])$/.test(i))
}

/**
 * Whether the text is an mac address ?
 * @public
 * @param val - text
 */
export function isMacAddress(val: any): boolean {
  const ary = val.split(':')
  return ary.length === 6 && ary.every((i) => /^[\dabcdefABCDEF]{2}$/.test(i))
}

/**
 * Whether the text is an Non-negative float?
 * @public
 * @param val - text
 */
export function isPositiveFloat(text: any): boolean {
  return /^[1-9][0-9]*(.[0-9]{1,2})?$/.test(text.toString()) || /^[0]{1}(.[0]{1,2})?$/.test(text.toString())
}

/**
 * Whether the text is an Non-negative integer?
 * @public
 * @param val - text
 */
export function isInt(text: any): boolean {
  if (isNil(text)) return false
  return /^(0|[1-9][0-9]*)$/.test(text.toString())
}

//
/**
 * Whether the text is an 0-100 float?
 * @public
 * @param val - text
 */
export function isPercent(text: any): boolean {
  return (/^[1-9][0-9]*(.[0-9]{1,2})?$/.test(text.toString()) && parseFloat(text.toString()) <= 100) || /^[0]{1}(.[0-9]{1,2})?$/.test(text.toString())
}

/**
 * Whether the text is an network port?
 * @public
 * @param val - text
 */
export function isPort(text: any): boolean {
  return (/^[1-9][0-9]*$/.test(text.toString()) && Math.floor(+text) <= 65535) || /^0$/.test(text.toString())
}

/**
 * Whether the input is js type?
 * @public
 * @param val - value
 * @param target - javascript type
 */
export function isJSType(val: any, target: string) {
  return (
    Object.prototype.toString
      .call(val)
      .replace(/^\[object ([a-zA-Z]*)\]$/, '$1')
      .toLowerCase() === target.toLowerCase()
  )
}

/**
 * Whether the text is '',null,undefined?
 * @public
 * @param val - value
 */
export function isEmpty(val: any): val is null | undefined | '' {
  return isNil(val) || val === ''
}

/**
 * Whether the text is not '',null,undefined?
 * @public
 * @param val - value
 */
export function isNotEmptyText(val: any) {
  return !isEmpty(val)
}

/**
 * Whether the text is 'null,undefined?
 * @param val - value
 * @public
 */
export function isNil(val: any): val is null | undefined {
  return val === null || val === undefined
}

/**
 * Whether the text is not 'null,undefined?
 * @public
 * @param val - value
 */
export function isDef(val: any) {
  return !isNil(val)
}

/**
 * Whether the val is function
 * @public
 * @param val - value
 */
export function isFunc(val: any): val is Function {
  return typeof val === 'function'
}
