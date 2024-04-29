/**
 * Format a date/time with customizable formatting options.
 * (y:year m:month d:day h:hour i:minutes s:second a:weekday w:week e:millisecond)
 *
 * @public
 * @param date - Date object, string, or timestamp
 * @param formatter - Format string (default: 'y-m-d h:i:s')
 * @example
 * ```
 * generatorDate('2020-01-01') // '2020-01-01 00:00:00 五'
 * generatorDate('2020-01-01','ymdhis.e 星期a 第w周') // '20200101000000.000 星期五 第w周'
 * ```
 */
export function generatorDate(date: any, formatter = 'y-m-d h:i:s') {
  let res = 'Invalid Date'
  if (!date) return res
  if (Object.prototype.toString.call(date) === '[object Date]') {
    /* empty */
  } else if (/^[0-9]{0,13}$/.test(date.toString())) {
    date = new Date(Math.floor(+date))
  } else if (typeof date === 'string') {
    date = date.replace(new RegExp(/-/gm), '/') //IOS
  }
  const d = new Date(date)
  if (d.toString() === 'Invalid Date') return res
  const getWeek = (d: Date): number => {
    const day1 = new Date(d.getFullYear(), 0, 1)
    const day1week = day1.getDay()
    const dayDifference = d.getTime() - day1.getTime() - (day1week == 0 ? 0 : 86400000 * (7 - day1week))
    if (dayDifference < 0) {
      return getWeek(new Date(d.getFullYear() - 1, 11, 31))
    }
    return Math.floor(dayDifference / 86400000 / 7) + 1
  }
  const formattedValues: Record<string, any> = {
    y: d.getFullYear(),
    m: d.getMonth() + 1,
    d: d.getDate(),
    h: d.getHours(),
    i: d.getMinutes(),
    s: d.getSeconds(),
    a: ['日', '一', '二', '三', '四', '五', '六'][d.getDay()],
    w: getWeek(d),
    e: d.getMilliseconds().toString().padStart(3, '0'),
  }
  res = formatter
  Object.keys(formattedValues).forEach((key) => {
    const reg = new RegExp(`${key}{1}`, 'g')
    res = res.replace(
      reg,
      /[awe]/.test(key) ? formattedValues[key] : formattedValues[key].toString().padStart(2, '0'), // 星期不填充0
    )
  })
  return res
}

/**
 * Format a date.
 * @public
 * @param date - Date object, string, or timestamp
 * @param separator - Separator character (default: '-')
 * @returns Formatted date string
 * @example
 * ```
 * fmtDate('2020-01-01') // '2020-01-01'
 * fmtDate('2020-01-01', '') // '20200101'
 * fmtDate('2020-01-01', 'a') // '2020a01a01'
 * ```
 */
export function fmtDate(date: any, splitter = '-') {
  return generatorDate(date, `y${splitter}m${splitter}d`)
}

/**
 * Format a date.
 * @public
 * @param Date - Date object, string, or timestamp
 * @param separator - Separator character (default: ':')
 * @example
 * ```
 *    fmtTime('2020-01-01') // '00:00:00'
 *    fmtTime('2020-01-01','') // '000000'
 *    fmtTime('2020-01-01',' ') // '00 00 00'
 * ```
 */
export function fmtTime(date: any, splitter = ':') {
  return generatorDate(date, `h${splitter}i${splitter}s`)
}

/**
 * Format a date.
 * @public
 * @param date - Date object, string, or timestamp
 * @example
 * ```
 *    fmtDateTime('2020-01-01') // '2020-01-01 00:00:00'
 * ```
 */
export function fmtDateTime(date: any) {
  return generatorDate(date, 'y-m-d h:i:s')
}

/**
 * Compare two timestamps, returning true if the second timestamp is greater than the first.
 * @public
 * @param first - The first timestamp
 * @param last - The second timestamp
 * @returns True if the second timestamp is greater than the first, otherwise false
 * @example isSecondTimeBigger('2020-01-01', '2020-01-02') == true
 */
export function isSecondTimeBigger(first: Date | string | number, last: Date | string | number) {
  return new Date(last).getTime() > new Date(first).getTime()
}

/**
 * Return a time string in the format '20001010123030'.
 * @public
 * @param date - The input date
 * @returns Time string
 */
export function timeString(date: Date | string | number) {
  return generatorDate(date, 'ymdhis')
}

/**
 * Return the week number of the year.
 * @public
 * @param date - The input date
 * @returns Week number
 */
export function fmtWeek(date: Date | string | number) {
  return generatorDate(date, 'w')
}

/**
 * Return the day of the week in Chinese.
 * @public
 * @param date - The input date
 * @returns Chinese day of the week
 */
export function fmtDay(date: Date | string | number) {
  return generatorDate(date, 'a')
}
