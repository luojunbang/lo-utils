export function parseToPx(val: string | number): string {
  if (/^[1-9][0-9]+(.[0-9]+)?$/g.test(val.toString())) return val + 'px'
  else return val.toString()
}
