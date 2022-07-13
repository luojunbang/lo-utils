/**
 *
 * @param {Function} func
 * @param {Number} wait
 * @returns {*}
 */
export function throttle(func, wait = 500) {
  let ctx, args, res, lastTime
  const handle = () => {
    lastTime = Date.now()
    res = func.apply(ctx, args)
  }
  return function (...argument) {
    !lastTime && (lastTime = Date.now())
    args = argument
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    ctx = this
    if (Date.now() - lastTime > wait) handle()
    return res
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait = 300, immediate = false) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function (...argument) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    context = this
    args = argument
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}
