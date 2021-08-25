// 工具

/**
 *
 * @param {*} params
 * @param {*} url
 * @returns
 */
exports.parseParams = function (params, url) {
  let res = url ? url + '?' : ''
  return (
    res +
    Object.keys(params)
      .map(key => `${key}=${encodeURIComponent(params[key] ? params[key] : '')}`)
      .join('&')
  )
}

/**
 *
 * @param {*} params
 * @param {*} url
 * @returns
 */
exports.getParams = function (url) {
  url = url.slice(url.indexOf('?') + 1).split('&')
  return url.reduce((rs, item) => {
    const [key, value] = item.split('=')
    rs[key] = decodeURIComponent(value)
    return rs
  }, {})
}
