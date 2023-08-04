/**
 * 拼接url与参数,skip undefined and null
 * @public
 * @example parseParams(\{a:1\},'github.com') == github.com?a=1
 */
export function parseParams(params: Record<string, any>, url = ''): string {
  const res = url ? url + '?' : ''
  return (
    res +
    Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key] ?? '')}`)
      .join('&')
  )
}

/**
 * 从url获取参数
 * @public
 * @example getParams('github.com?a=1') == \{a:1\}
 */
export function getParams(url: string) {
  const url_ary = url.slice(url.indexOf('?') + 1).split('&')
  return url_ary.reduce((rs, item) => {
    const [key, value] = item.split('=')
    rs[key] = decodeURIComponent(value)
    return rs
  }, {} as Record<string, string>)
}
