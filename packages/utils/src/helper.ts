/**
 * 检查是否首次访问
 * @public
 * @returns - Promise<Boolean>
 */
export function checkIsFirstEntry(flagKey = 'IS_FIRST_ENTRY') {
  if (!window || !window.localStorage) throw new Error('This method need to run in browser')
  return new Promise((rs, rj) => {
    const ret = window.localStorage.getItem(flagKey)
    if (ret) {
      rj(ret)
    } else {
      window.localStorage.setItem(flagKey, '1')
      rs('1')
    }
  })
}
