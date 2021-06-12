import { isIpv4, isPercent, isPort, isLoss } from '@/utils'

// ip校验
export const ip = (msg = '请输入正确的IP') => {
  return function(rule, val, cb) {
    if (isIpv4(val) || val === '') cb()
    else cb(msg)
  }
}

// 端口校验
export const port = (msg = '请输入0-65535的正整数') => {
  return function(rule, val, cb) {
    if (isPort(val) || val === '') cb()
    else cb(msg)
  }
}

// mac校验
export const mac = (msg = '请输入正确的MAC地址') => {
  return function(rule, val, cb) {
    if (isPort(val) || val === '') cb()
    else cb(msg)
  }
}

// 时间校验
export const timeCheck = () => {
  return function(rule, val, cb) {
    const timeLag = rule.timeLag || 7
    if (Date.parse(val[1]) - Date.parse(val[0]) > 3600 * 1000 * 24 * timeLag) cb(`查询间隔不能大于${timeLag}天`)
    else cb()
  }
}

// 百分率校验
export const rateRange = (msg = '请输入正确的区间') => {
  return (rule, val, cb) => {
    if (!val || !Array.isArray(val)) cb()
    else if (val.some(num => num !== '' && !isPercent(num))) cb('请输入0-100的数字')
    else if (parseFloat(val[0] || 0) <= parseFloat(val[1] || 100)) cb()
    else cb(msg)
  }
}

// 端口区间校验
export const portRange = (msg = '请输入正确的区间') => {
  return (rule, val, cb) => {
    if (!val || !Array.isArray(val)) cb()
    else if (val.some(num => num !== '' && !isPort(num))) cb('请输入0-65535的正整数')
    else if (parseFloat(val[0] || 0) <= parseFloat(val[1] || 65535)) cb()
    else cb(msg)
  }
}

// 离群因子区间校验
export const lossRange = (msg = '请输入正确的区间') => {
  return (rule, val, cb) => {
    if (!val || !Array.isArray(val)) cb()
    else if (val.some(num => num !== '' && !isLoss(num))) cb('请输入数字')
    else if (parseFloat(val[0] || 0) <= parseFloat(val[1] || 0)) cb()
    else cb(msg)
  }
}

export function validatorErrorHandler(fieldList, errObj) {
  const errList = Object.keys(errObj)
  if (errList.length > 0) {
    const errInfo = errObj[errList[0]]
    if (Array.isArray(errInfo) && errInfo.length > 0) {
      const { message, field } = errInfo[0]
      if (message && field) {
        const idx = fieldList.findIndex(item => item.key === field)
        idx != -1 && this.$messageTip.error(fieldList[idx].name + message)
      }
    }
  }
}
