import { isEmpty, isJSType } from "./validator";

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait = 300, immediate = false) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
  return function (...argument) {
    context = this;
    args = argument;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

export function fmtNum(val) {
  // toDo...
  return val;
}

// 计算label的长度 三个数组字母==两个文字
export function getLabelWidth(label, fontSize = 14) {
  let minWidth = 2 * fontSize,
    res = minWidth;
  if (!label) return minWidth;
  if (label.length) {
    const az09AryLength = label
      .split("")
      .filter((i) => /[0-9A-Za-z()%]/.test(i)).length;
    res =
      Math.ceil((az09AryLength * fontSize * 2) / 3) +
      (label.length - az09AryLength) * fontSize;
  }
  return Math.max(minWidth, res);
}

export function fmtUndefind(val) {
  if (val === undefined || val === null) return "-";
  return val;
}

export function fmtEmptyVal(val,target='-'){
	if(isEmpty(val)) return target
	return val
}

//特殊输入转义
export function SaferHTML(data) {
  const result = data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return result;
}

export function copyText(val) {
  if (!isType(val, "string") || document) return false;
  var oInput = document.createElement("input");
  oInput.value = val;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand("Copy"); // 执行浏览器复制命令
  oInput.style.display = "none";
  document.body.removeChild(oInput);
  return true;
}
