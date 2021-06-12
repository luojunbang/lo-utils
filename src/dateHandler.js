/**
 * @desc 生成日期对象
 * @param Date | String | Number
 * @returns //2020-01-01
 */
const generatorDate = function (date, formatter = "y-m-d h:i:s") {
  let res = "Invalid Date";
  if (!date) return res;
  if (Object.prototype.toString.call(date) === "[object Date]") {
  } else if (/^[0-9]{0,13}$/.test(date)) {
    if (date.length === 10) {
      // 对于秒数做一个处理
      date += "000";
    }
    date = new Date(Math.floor(date));
  } else if (typeof date === "string") {
    date = date.replace(new RegExp(/-/gm), "/"); //IOS
  }
  let d = new Date(date);
  if (d.toString() === "Invalid Date") return res;
  const formatObj = {
    y: d.getFullYear(),
    m: d.getMonth() + 1,
    d: d.getDate(),
    h: d.getHours(),
    i: d.getMinutes(),
    s: d.getSeconds(),
    a: d.getDay(),
  };
  res = formatter.replace(/([ymdhisa])+/g, (_, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return res;
};

/**
 * @param Date | String | Number
 * @returns //2020-01-01
 */
const fmtDate = function (date, splitor = "-") {
  return generatorDate(date, `y${splitor}m${splitor}d`);
};

/**
 * @param Date | String | Number
 * @returns //18:00:00
 */
const fmtTime = function (date, splitor = ":") {
  return generatorDate(date, `h${splitor}i${splitor}s`);
};

/**
 * @param Date | String | Number
 * @returns 2020-01-01 18:00:00
 */
const fmtDateTime = function (date) {
  return generatorDate(date);
};

/**
 * @param Date | String | Number
 * @param Date | String | Number
 * @returns Boolean
 */
const isSecondTimeBigger = function (start, end) {
  return generatorDate(end) > generatorDate(start);
};

export default { fmtDate, fmtTime, fmtDateTime, isSecondTimeBigger };
