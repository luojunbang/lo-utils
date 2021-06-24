/**
 * @desc 生成日期对象
 * @param Date | String | Number
 * @returns //2020-01-01
 */
const generatorDate = function (date, formatter = 'y-m-d h:i:s') {
  let res = 'Invalid Date'
  if (!date) return res
  if (Object.prototype.toString.call(date) === '[object Date]') {
  } else if (/^[0-9]{0,13}$/.test(date)) {
    if (date.length === 10) {
      // 对于秒数做一个处理
      date += '000'
    }
    date = new Date(Math.floor(date))
  } else if (typeof date === 'string') {
    date = date.replace(new RegExp(/-/gm), '/') //IOS
  }
  let d = new Date(date)
  if (d.toString() === 'Invalid Date') return res
  const formatObj = {
    y: d.getFullYear(),
    m: d.getMonth() + 1,
    d: d.getDate(),
    h: d.getHours(),
    i: d.getMinutes(),
    s: d.getSeconds(),
    a: ['日', '一', '二', '三', '四', '五', '六'][d.getDay()],
  }
  res = formatter
  Object.keys(formatObj).forEach((key) => {
    const reg = new RegExp(`${key}{1}`, 'g')
    res = res.replace(
      reg,
      key === 'a' ? formatObj[key] : formatObj[key].toString().padStart(2, '0') // 星期不填充0
    )
  })
  return res
}

/**
 * @param Date | String | Number
 * @returns //2020-01-01
 */
const fmtDate = function (date, splitor = '-') {
  return generatorDate(date, `y${splitor}m${splitor}d`)
}

/**
 * @param Date | String | Number
 * @returns //18:00:00
 */
const fmtTime = function (date, splitor = ':') {
  return generatorDate(date, `h${splitor}i${splitor}s`)
}

/**
 * @param Date | String | Number
 * @returns 2020-01-01 18:00:00
 */
const fmtDateTime = function (date, formatter) {
  return generatorDate(date, formatter)
}

/**
 * @param Date | String | Number
 * @param Date | String | Number
 * @returns Boolean
 */
const isSecondTimeBigger = function (start, end) {
  return generatorDate(end) > generatorDate(start)
}

module.exports = {
  generatorDate,
  fmtDate,
  fmtTime,
  fmtDateTime,
  isSecondTimeBigger,
}
