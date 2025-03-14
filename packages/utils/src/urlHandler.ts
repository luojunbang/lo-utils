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
