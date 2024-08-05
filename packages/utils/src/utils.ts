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
 * 生成随机字符串
 * @public
 * @param x - 位数
 */
export function r(x = 10): string {
  const str = Math.random().toString(16).slice(2)
  return Array.from({ length: 1 + Math.ceil(x / str.length) })
    .map((i) => Math.random().toString(16).slice(2))
    .join('')
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

/**
 * 多线程执行异步任务
 * @public
 * @param list
 * @param fn
 * @param thread
 * @returns
 */
export async function quene<T = any>(list: T[], fn: (item: T, idx: number) => Promise<any>, thread = 2) {
  let idx = 0 // Start index at 0
  const results: any[] = [] // Array to store results

  const executeNext = async () => {
    const currentIdx = idx++
    if (currentIdx < list.length) {
      const result = await fn(list[currentIdx], currentIdx).catch((err) => {
        return err
      })
      results[currentIdx] = result // Store result at the correct index
      await executeNext() // Recursively execute next task
    }
  }

  // Limit concurrency using Promise.all with chunking
  await Promise.all(Array.from({ length: Math.min(thread, list.length) }, () => executeNext()))

  return results // Return all results
}
