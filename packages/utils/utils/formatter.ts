// 格式化
import { isEmpty, isJSType, isInt } from './validator'

/**
 *
 * @param {*} val
 * @returns
 */
export function fmtNum(val: string | number, fixed = 0): string {
  // toDo...
  return val.toString()
}

/**
 *
 * @param {*} val
 * @returns
 */
export function fmtUndefined(val: any) {
  if (val === undefined || val === null) return '-'
  return val
}

/**
 *
 * @param {*} val
 * @returns
 */
export function fmtEmptyVal(val: any, target = '-') {
  if (isEmpty(val)) return target
  return val
}

/**
 * @description formatter size display
 * @param {String｜Number } val The val to transform ,default unit is b,Only accept 2b 2k 2m 2g 2t 2p
 * @param {String} unit accept targetUnit ex.'k','K','Kb'
 * @returns {String} The val after transform
 * @example
 * ```js
 * ('2048K','m') -> '2m'
 * ```
 */
export function fmtStorageSize(val: string | number, unit: string): string {
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
 *
 * @param {*} val
 * @returns
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
