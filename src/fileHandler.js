/**
 * 从URL里下载文件
 * fileName:文件名
 * data:后台取得的数据
 * dataType: 数据格式
 */
export function downloadFile(fileName, data, dataType) {
  if (!data || !fileName) return
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
// dataType
// zip:'application/zip;charset=utf-8
// xls:'application/vnd.ms-excel;charset=UTF-8'
// xlxs:'

/**
 * 导出Excel文件
 * @param parameters 参数
 * @param url 请求地址
 */
export function getFileSlient(url) {
  //向后台发送请求
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  iframe.setAttribute('src', url)
}

/**
 * 从Public文件夹里下载文件
 * fileName:文件名
 * url:在public文件夹中的url 首字符不带/ eg:theme/index.css
 */
export function downloadStaticFile(fileName, url) {
  if (!fileName || !url) return
  let a = document.createElement('a')
  a.setAttribute('href', `${process.env.BASE_URL}${url}`)
  a.setAttribute('download', fileName)
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
