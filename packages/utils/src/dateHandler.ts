/**
 * 格式化日期时间星期(y:年 m:月 d:日 h:小时 i:分钟 s:秒 a:星期 w:第几周 e:毫秒)
 * @param date - 日期
 * @param formatter - 格式
 * @example
 *    generatorDate('2020-01-01') == '2020-01-01 00:00:00 五'
 *    generatorDate('2020-01-01','ymdhis 星期a 第w周') == '20200101000000 星期五 第w周'
 * @public
 */
export function generatorDate(date: Date | string | number, formatter = 'y-m-d h:i:s') {
  let res = 'Invalid Date'
  if (!date) return res
  if (Object.prototype.toString.call(date) === '[object Date]') {
  } else if (/^[0-9]{0,13}$/.test(date.toString())) {
    date = new Date(Math.floor(+date))
  } else if (typeof date === 'string') {
    date = date.replace(new RegExp(/-/gm), '/') //IOS
  }
  const d = new Date(date);
  if (d.toString() === "Invalid Date") return res;
  const getWeek = (d: Date): number => {
    const day1 = new Date(d.getFullYear(), 0, 1);
    const day1week = day1.getDay();
    const dis =
      d.getTime() -
      day1.getTime() -
      (day1week == 0 ? 0 : 86400000 * (7 - day1week));
    if (dis < 0) {
      return getWeek(new Date(d.getFullYear() - 1, 11, 31));
    }
    return Math.floor(dis / 86400000 / 7) + 1;
  };
  const formatObj: Record<string, any> = {
    y: d.getFullYear(),
    m: d.getMonth() + 1,
    d: d.getDate(),
    h: d.getHours(),
    i: d.getMinutes(),
    s: d.getSeconds(),
    a: ["日", "一", "二", "三", "四", "五", "六"][d.getDay()],
    w: getWeek(d),
    e: d.getMilliseconds().toString().padStart(3, '0'),
  }
  res = formatter
  Object.keys(formatObj).forEach((key) => {
    const reg = new RegExp(`${key}{1}`, 'g')
    res = res.replace(
      reg,
      /[awe]/.test(key) ? formatObj[key] : formatObj[key].toString().padStart(2, '0'), // 星期不填充0
    )
  })
  return res
}

/**
 * 格式化日期
 * @public
 * @param Date - 日期
 * @param splitter - 默认-
 * @example
 *    fmtDate('2020-01-01') == '2020-01-01'
 *    fmtDate('2020-01-01','') == '20200101'
 *    fmtDate('2020-01-01','a') == '2020a01a01'
 */
export function fmtDate(date: any, splitter = "-") {
  return generatorDate(date, `y${splitter}m${splitter}d`);
}

/**
 * 格式化时间
 * @public
 * @param Date - 日期
 * @param splitter - 默认:
 * @example
 *    fmtTime('2020-01-01') == '00:00:00'
 *    fmtTime('2020-01-01','') == '000000'
 *    fmtTime('2020-01-01',' ') == '00 00 00'
 */
export function fmtTime(date: any, splitter = ":") {
  return generatorDate(date, `h${splitter}i${splitter}s`);
}

/**
 * 格式化日期时间星期(y:年 m:月 d:日 h:小时 i:分钟 s:秒 a:星期 w:第几周)
 * @public
 * @param date - 日期
 * @param formatter - 格式
 * @example
 *    generatorDate('2020-01-01') == '2020-01-01 00:00:00 五'
 *    generatorDate('2020-01-01','ymdhis 星期a 第w周') == '20200101000000 星期五 第w周'
 */
export function fmtDateTime(date: Date | string | number) {
  return generatorDate(date, 'y-m-d h:i:s')
}

/**
 * 比较时间,第二参数时间戳比第一参数时间戳大
 * @public
 * @param first - 第一个参数
 * @param last - 第二个参数
 * @example isSecondTimeBigger('2020-01-01','2020-01-02') == true
 */
export function isSecondTimeBigger(first: Date | string | number, last: Date | string | number) {
  return new Date(last).getTime() > new Date(first).getTime()
}

/**
 * 返回时间字符串 20001010123030
 * @public
 * @param date - input
 */
export function timeString(date: Date | string | number) {
  return generatorDate(date, 'ymdhis')
}

/**
 * 返回第几周
 * @public
 * @param date - input
 */
export function fmtWeek(date: Date | string | number) {
  return generatorDate(date, 'w')
}

/**
 * 返回中文星期几
 * @public
 * @param date - input
 */
export function fmtDay(date: Date | string | number) {
  return generatorDate(date, 'a')
}
