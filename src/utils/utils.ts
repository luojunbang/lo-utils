// 工具
import { isJSType } from './validator'

/**
 * @description 计算label的长度 三个数组字母==两个文字
 * @param {*} label
 * @param {*} fontSize
 * @returns
 */
export function getLabelWidth(label: string, fontSize = 14) {
  const minWidth = 2 * fontSize
  let res = minWidth
  if (!label) return minWidth
  if (label.length) {
    const az09AryLength = label.split('').filter(i => /[0-9A-Za-z()%]/.test(i)).length
    res = Math.ceil((az09AryLength * fontSize * 2) / 3) + (label.length - az09AryLength) * fontSize
  }
  return Math.max(minWidth, res)
}

/**
 *
 * @param {*} val
 * @returns
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
 * @description 获取滚动条宽度
 * @returns Number
 *
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

export function isInContainer() {
  console.log('heloo')
}

export function r(x = 10) {
  return Math.random()
    .toString(16)
    .slice(2, 2 + x)
}

export function t(x = 2) {
  return new Promise(rs => setTimeout(rs, x * 1000))
}
