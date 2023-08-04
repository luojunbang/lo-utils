/**
 * 像素单位转换
 * @public
 * @param val - target
 * @example 100 returns 100px,100vw returns 100vw,100% returns 100%
 */
export function parseToPx(val: string | number): string {
  if (/^[1-9][0-9]+(.[0-9]+)?$/g.test(val.toString())) return val + 'px'
  else return val.toString()
}
