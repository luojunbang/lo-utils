module.exports = {
  checkIsFirstEntry,
}

/**
 * @param callback
 */
function checkIsFirstEntry(flagKey = 'IS_FIRST_ENTRY') {
  if (!window || !window.localStorage) throw new Error('This method need to run in browser')
  return new Promise((rs, rj) => {
    if (window.localStorage.getItem(flagKey)) {
      rj(window.localStorage.getItem(flagKey))
    } else {
      window.localStorage.setItem(flagKey, 1)
      rs(1)
    }
  })
}
