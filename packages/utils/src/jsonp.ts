import { parseParams, r } from './index'

/**
 * @public
 * jsonp
 * @param url - url
 * @param params - params
 * @returns - Promise
 */
export function jsonp<T>(url: string, params: Record<string, any> = {}): Promise<{ data: T }> {
  if (!window) return Promise.reject()
  const _w = window.top as Window
  return new Promise((rs, rj) => {
    try {
      const _id: string = 'jsonp_' + r()
      Reflect.defineProperty(_w, _id, {
        writable: false,
        configurable: true,
        enumerable: false,
        value: function (res: T) {
          rs({ data: res })
          Reflect.deleteProperty(window, _id)
        },
      })
      const script = _w.document.createElement('script')
      const _params = parseParams(params)
      script.src = url + _id + (_params ? '&' : '') + _params
      _w.document.head.append(script)
    } catch (e) {
      rj(e)
    }
  })
}
