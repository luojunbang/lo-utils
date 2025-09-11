// 格式化
import { isEmpty, isJSType, isInt } from './validator'

/**
 * 根据本地语言格式化数字
 * @public
 * @param val - formatter value
 * @param fixed - 小数点后位数
 * @param currency - 是否增加货币符号
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

export function abbreviateNumber(num: number, decimals: number = 1, round: boolean = false): string {
  const units = ['', 'K', 'M', 'B', 'T']
  let unitIndex = 0
  let n = num

  while (n >= 1000 && unitIndex < units.length - 1) {
    n /= 1000
    unitIndex++
  }

  // 保留指定位数小数
  const value = toFixedNumber(n, decimals, round)
  let formatted = value.toFixed(decimals)

  // 去掉尾部无意义的 .0 / 0
  if (decimals > 0) {
    formatted = formatted.replace(/\.0+$|(\.\d*[1-9])0+$/, '$1')
  }

  return formatted + units[unitIndex]
}

export function abbreviateNumberDefaultK(num: number, round: boolean = false): string {
  let n = num

  // 100 <= num < 1000 时也要以 k 为单位（0.xk）
  if (num >= 100 && num < 1000) {
    n = num / 1000
  } else return abbreviateNumber(num, 1, round)

  const value = toFixedNumber(n, 1, round)

  // 格式化并去掉无意义的尾0
  const formatted = value.toFixed(1).replace(/\.0+$|(\.\d*[1-9])0+$/, '$1')

  return formatted + 'k'
}
/**
 * 保留指定小数位，可以选择四舍五入或截断
 * @param n 数字
 * @param decimals 保留的小数位数
 * @param round 是否四舍五入（false 表示截断）
 */
export function toFixedNumber(n: number, decimals: number = 1, round: boolean = false): number {
  const factor = Math.pow(10, decimals)
  return round
    ? Math.round(n * factor) / factor // 四舍五入
    : Math.floor(n * factor) / factor // 截断
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
