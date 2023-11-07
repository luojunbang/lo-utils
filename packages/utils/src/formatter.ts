// 格式化
import { isEmpty, isJSType, isInt } from './validator'

/**
 * 根据本地语言格式化数字
 * @public
 * @param val - formatter value
 * @param fixed - 小数点后位数
 * @param currency 是否增加货币符号
 * @returns
 */
export function fmtNum(val: any, fixed = 0, currency = ''): string {
  if (isJSType(val, 'string')) val = parseFloat(val)
  if (isNaN(val)) return 'Invalid number'
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: fixed,
    maximumFractionDigits: fixed,
  }
  return `${currency}${val.toLocaleString(undefined, options)}`
}

/**
 * 格式化空白文本 null undefind ''
 * @public
 * @param val - formater value
 */
export function fmtEmptyVal(val: any, target = '-') {
  if (isEmpty(val)) return target
  return val
}

/**
 * 格式化存储大小
 * @public
 * @param val - The val to transform ,default unit is b,Only accept 2b 2k 2m 2g 2t 2p
 * @param unit - accept targetUnit ex.'k','K','Kb'
 * @example
 * ('2048K','m') returns '2m'
 */
export function fmtStorageSize(val: string | number, unit?: string): string {
  const UNIT = 'bkmgtp'.split('')
  val = val.toString().toLowerCase()
  const size = parseFloat(val)
  let originUnit = 'b'

  if (isNaN(size)) throw new Error('Require a right input')
  if (/[bkmgtp]/.test(val)) originUnit = val.replace(/^[0-9.]+([bkmgtp]{1})$/g, '$1')
  let res = size * Math.pow(1024, UNIT.indexOf(originUnit)), //transform size with unit b
    unitIdx = 0
  if (unit) {
    if (isJSType(unit, 'string') && UNIT.indexOf(unit[0].toLowerCase()) != -1) {
      const targetUnitIdx = UNIT.indexOf(unit[0].toLowerCase())
      res = res * Math.pow(1024, 0 - targetUnitIdx)
    } else throw new Error('Require the correct transform unit')
  } else {
    while (res.toFixed(0).length > 3) {
      res = res / 1024
      unitIdx++
    }
  }
  return (isInt(res) ? res : res.toFixed(1)) + (unit ? unit : UNIT[unitIdx])
}

/**
 * 格式化内容长度
 * @public
 * @param val - formater value
 */
export function fmtContentLength(val: string | number): string {
  const UNIT = 'BKMGTP'
  let res = +val
  let unitIdx = 0
  while (res.toFixed(0).length > 3) {
    res = res / 1000
    unitIdx++
  }
  return (isInt(res) ? res : res.toFixed(1)) + UNIT[unitIdx]
}
