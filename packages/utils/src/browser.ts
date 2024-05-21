import { isJSType } from './validator'

/**
 * 检查是否首次访问
 * @public
 * @param flagKey - key in localStorage
 * @returns The timestamp of first entry.
 */
export function checkIsFirstEntry(flagKey = 'IS_FIRST_ENTRY'): Promise<string> {
  if (!window || !window.localStorage) throw new Error('This method need to run in browser')
  return new Promise((rs, rj) => {
    const ret = window.localStorage.getItem(flagKey)
    if (ret) {
      rj(ret)
    } else {
      const d = Date.now().toString()
      window.localStorage.setItem(flagKey, d)
      rs(d)
    }
  })
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
 * 复制文本
 * @public
 * @param val - text
 */
export function copyText(val: string) {
  if (!isJSType(val, 'string') || !document) return false

  // 创建一个临时的 textarea 元素
  const textarea = document.createElement('textarea')
  textarea.value = val // 设置文本内容
  document.body.appendChild(textarea) // 将 textarea 添加到文档中

  // 选中 textarea 的内容
  textarea.select()
  textarea.setSelectionRange(0, textarea.value.length) // 对于移动设备

  // 执行复制命令
  document.execCommand('copy')

  // 删除临时的 textarea 元素
  document.body.removeChild(textarea)
}
