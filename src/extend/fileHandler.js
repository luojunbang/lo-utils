// 文件工具

/**
 * @description
 * 从URL里下载文件
 * @param {String} fileName 文件名
 * @param {String} data 文件流
 * @param {String} dataType 文件类型
 * @example
 * ```js
 *    dataType
 *    zip:'application/zip;charset=utf-8
 *    xls:'application/vnd.ms-excel;charset=UTF-8'
 *    xlsx:TODO
 * ```
 */
exports.downloadFile = function (fileName, data, dataType) {
  if (!data || !fileName || !window) return
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(data, fileName) //IE
  } else {
    const url = window.URL.createObjectURL(new Blob([data], { type: dataType }))
    let a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', fileName)
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }
}

/**
 * @description 静默iframe导出文件
 * @param url 请求地址
 */
exports.getFileSilent = function (url) {
  if (!window) throw new Error('This function need window env')
  //向后台发送请求
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  iframe.setAttribute('src', url)
}
