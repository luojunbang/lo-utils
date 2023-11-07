// 工具
import { isJSType } from './validator'

/**
 * 计算label的长度 三个数组字母==两个文字
 * @public
 * @param label - text
 * @param fontSize - font size
 */
export function getLabelWidth(label: string, fontSize = 14) {
  const minWidth = 2 * fontSize
  let res = minWidth
  if (!label) return minWidth
  if (label.length) {
    const az09AryLength = label.split('').filter((i) => /[0-9A-Za-z()%]/.test(i)).length
    res = Math.ceil((az09AryLength * fontSize * 2) / 3) + (label.length - az09AryLength) * fontSize
  }
  return Math.max(minWidth, res)
}

/**
 * 复制文本
 * @public
 * @param val - text
 */
export function copyText(val: string) {
  if (!isJSType(val, 'string') || !document) return false
  const oInput = document.createElement('input')
  oInput.value = val
  document.body.appendChild(oInput)
  oInput.select() // 选择对象
  document.execCommand('Copy') // 执行浏览器复制命令
  oInput.style.display = 'none'
  document.body.removeChild(oInput)
  return true
}

/**
 * 获取滚动条宽度
 * @public
 */
export function getScrollbarWidth(): number {
  if (!window || !document) throw new Error('Need window env')
  const outerDiv = document.createElement('div')
  outerDiv.style.width = '100px'
  outerDiv.style.position = 'absolute'
  outerDiv.style.visibility = 'hidden'
  outerDiv.style.top = '-9999px'
  document.body.appendChild(outerDiv)

  const outerboxWidth = outerDiv.offsetWidth
  outerDiv.style.overflow = 'scroll'

  const innerDiv = document.createElement('div')
  innerDiv.style.width = '100%'
  outerDiv.appendChild(innerDiv)
  const innerboxWidth = innerDiv.offsetWidth
  document.body.removeChild(outerDiv)
  return outerboxWidth - innerboxWidth
}

/**
 * 检测元素是否到达可视窗口内
 * @alpha
 */
export function isInContainer(element: string | HTMLElement) {}

/**
 * 生成随机字符串
 * @public
 * @param x - 位数
 */
export function r(x = 10): string {
  return Math.random()
    .toString(16)
    .slice(2, 2 + x)
}

/**
 * 等待n秒
 * @public
 * @param x - second
 */
export function t(wait: number, ...args: any[]) {
  return new Promise((rs) => setTimeout(rs, wait * 1000, ...args))
}

interface Option extends Record<string, any> {
  label: string
  value: string
}

/**
 * 数组选项转换为格式化对象
 * @public
 * @param options - 选项
 * @example [\{label:'label',value:'value'\}] returns \{value:'label'\}
 */
export const opt2fmt = (options: Option[]) => {
  const fmtConfig: Record<string, any> = {}
  options.forEach((item) => {
    const { label, value } = item
    fmtConfig[value] = label
  })
  return fmtConfig
}

/**
 * 数组选项转换为格式化函数
 * @public
 * @param options - 选项
 * @returns a formatter function return the label for the value
 */
export const opt2fmtFn = (options: Option[]) => (val: any) => opt2fmt(options)[val] ?? val ?? '-'
