const fmt2 = function(num) {
  return num < 10 ? '0' + num : num
}

/**
 * @desc 生成日期对象
 * @param Date | String | Number
 * @returns //2020-01-01
 */
const generatorDate = function(date, formatter = 'y-m-d h:i:s') {
  let res = 'Invalid Date'
  if (!date) return res
  if (Object.prototype.toString.call(date) === '[object Date]') {
  } else if (/^[0-9]{0,13}$/.test(date)) {
    if (date.length === 10) {
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
    a: d.getDay()
  }
  res = formatter.replace(/([ymdhisa])+/g, (_, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return res
}

/**
 * @param Date | String | Number
 * @returns //2020-01-01
 */
const _fmtDate = function(date, splitor = '-') {
  return generatorDate(date, `y${splitor}m${splitor}d`)
}

/**
 * @param Date | String | Number
 * @returns //18:00:00
 */
const _fmtTime = function(date, splitor = ':') {
  return generatorDate(date, `h${splitor}i${splitor}s`)
}

/**
 * @param Date | String | Number
 * @returns 2020-01-01 18:00:00
 */
const _fmtDateTime = function(date) {
  return generatorDate(date)
}

const _isSecondTimeBigger = function(start, end) {
  return generatorDate(end) > generatorDate(start)
}
//test
// const foo = new Date()
// console.log(generatorDate(foo))
// console.log(generatorDate(foo.toString()))
// console.log(generatorDate(foo.getTime()))
// console.log(generatorDate(foo.getTime().toString()))
// console.log(generatorDate('12321322'))
// console.log(generatorDate('2017-02-1'))
// console.log(generatorDate(Date()))
// console.log(generatorDate(Date.now()))
// console.log(generatorDate('err Date'))
// console.log(generatorDate({}))
// console.log(generatorDate(Date))
// console.log(generatorDate(console.log))

export const fmtDate = _fmtDate
export const fmtTime = _fmtTime
export const fmtDateTime = _fmtDateTime
export const isSecondTimeBigger = _isSecondTimeBigger
