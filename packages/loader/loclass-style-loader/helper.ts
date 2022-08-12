let config: Record<string, string> = {}
const directionTypes = ['t', 'r', 'b', 'l', 'x', 'y']
const directionOriginals = ['top', 'right', 'bottom', 'left', 'left,right', 'top,bottom']
if (Object.keys(config).length === 0) generateConfig()

console.log(config)

import { isInt } from 'lo-utils'

function configContact(alias: string, name: string, types: string[] = [], originals: string[] = []) {
  if (types.length === 0) config[alias] = name
  types.forEach((type, idx) => {
    const t = type
    config[alias + t] = originals[idx]
      .split(',')
      .map(i => (i !== '' ? `${name}-${i}` : name))
      .join(',')
  })
}
export const wrapStyleBlock = (block: string): string => `\n  <style scoped> ${block}</style> \n`

export const autoFixUnit = (str: string): string => {
  if (/[\dAaBbCcDdEeFf]{6}/.test(str)) return '#' + str //#00AA00
  else if (/^\d+_\d+_\d+(_\d+)?$/.test(str)) {
    // 20_20_20 -> rgb(20,20,20)
    // 20_20_20_20 -> rgba(20,20,20,0.20)
    const strAry = str.split('_')
    if (strAry.length === 4) strAry[3] = (+strAry[3] / 100).toFixed(2)
    return `rgb${strAry.length == 4 ? 'a' : ''}(${strAry.join(',')})`
  } else if (/^v_[\w]+$/.test(str)) {
    // v_primary__color -> var(--primary--color)
    return `var(${str.replace('v_', '--').replace(/_/g, '-')})` 
  } else if (isInt(str)) return str + 'px'
  else return str
}

export function parseClass(className: string, prefix: string) {
  let style = ''
  try {
    const [attr, ...value] = className.replace(prefix, '').split('-')
    const cssStyle = getCssProperty(attr)
      .split(',')
      .map(prop => {
        return `${prop}:${value.map(autoFixUnit).join(' ')};`
      })
      .join('')

    style = `.${className}{${cssStyle}}`
  } catch (e) {
    throw new Error(`parseClass Error with ClassName:${className},prefix:${prefix}\n` + e)
  }
  return style
}

function generateConfig() {
  configContact('font', 'font', ['', 'w'], ['size', 'weight'])
  configContact('lh', 'line-height')
  configContact('bgc', 'background-color')
  configContact('bg', 'background')
  configContact('w', 'width')
  configContact('mw', 'max-width')
  configContact('h', 'height')
  configContact('mh', 'max-height')
  configContact('bd', 'border')
  configContact('bd', 'border', ['c', 'rd', ...directionTypes], ['color', 'raduis', ...directionOriginals])
  configContact('mg', 'margin')
  configContact('mg', 'margin', directionTypes, directionOriginals)
  configContact('pd', 'padding')
  configContact('pd', 'padding', directionTypes, directionOriginals)
}

export function getCssProperty(key: string) {
  return config[key] ?? key.replace(/([A-Z])/g, (_rs, $1) => '-' + $1.toLowerCase())
}
