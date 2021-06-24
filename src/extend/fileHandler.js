/* eslint-disable no-undef */
/**
 * 从URL里下载文件
 * fileName:文件名
 * data:后台取得的数据
 * dataType: 数据格式
 */
function downloadFile(fileName, data, dataType) {
  if (!data || !fileName || !window) return
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(data, fileName) //IE
  } else {
    const url = window.URL.createObjectURL(
      new Blob([data], { type: dataType })
    )
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
// dataType
// zip:'application/zip;charset=utf-8
// xls:'application/vnd.ms-excel;charset=UTF-8'
// xlxs:'

/**
 * 导出Excel文件
 * @param parameters 参数
 * @param url 请求地址
 */
function getFileSlient(url) {
  if (!window) throw new Error('This function need window env')
  //向后台发送请求
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  iframe.setAttribute('src', url)
}

module.exports = {
  downloadFile,
  getFileSlient,
}
