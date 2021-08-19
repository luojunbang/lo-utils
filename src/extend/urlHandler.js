module.exports = {
  parseParams,
  getParams,
}

function parseParams(params, url) {
  let res = url ? url + '?' : ''
  return (
    res +
    Object.keys(params)
      .map(key => `${key}=${encodeURIComponent(params[key] ? params[key] : '')}`)
      .join('&')
  )
}

function getParams(url) {
  url = url.slice(url.indexOf('?') + 1).split('&')
  return url.reduce((rs, item) => {
    const [key, value] = item.split('=')
    rs[key] = decodeURIComponent(value)
    return rs
  }, {})
}
