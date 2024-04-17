// 文件工具

/**
 * 文件流转化为文件
 * @public
 * @param fileName - filename
 * @param blob  - file arraybuffer
 * @param fileType - file type such as (xls,zip,pdf) or the original fileType in mdn
 */
export function generatorFile(fileName: string, blob: BlobPart, fileType = ''): void {
  const FILE_TYPE: Record<string, string> = {
    zip: 'application/zip;charset=utf-8',
    xls: 'application/vnd.ms-excel;charset=UTF-8',
    pdf: 'application/pdf;charset=utf-8',
  }

  const url = window.URL.createObjectURL(new Blob([blob], { type: FILE_TYPE[fileType] ?? fileType }))

  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', fileName)
  a.style.display = 'none'
  document.body.append(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

/**
 * 根据请求头转换文件名
 * @public
 * @param contentDispotion - request header attribute
 */
export function parseFileName(contentDispotion: string | undefined): string {
  if (contentDispotion === undefined) return Math.random().toString(16).slice(2)
  if (/UTF-8/.test(contentDispotion)) return contentDispotion.replace(/[\s\S]+UTF-8''([\S\s]+\.[\S]+)/, '$1')
  return contentDispotion.replace(/\s*attachment;\s*filename="([\S\s]+\.[\S]+)"[\s\S]*/, '$1')
}

/**
 * axios下载文件封装
 * @public
 * @param res - axios response
 * @param fileName - custom filename or request header filename
 * @param type - file type such as (xls,zip,pdf) or the original fileType in mdn
 */
export function generatorFileAxios(res: { headers: Record<string, any>; data: BlobPart }, fileName?: string, type?: string): void {
  const { headers, data } = res
  generatorFile(fileName ?? parseFileName(headers['content-disposition']), data, type)
}

/**
 * dataURLtoFile
 * @public
 * @param dataurl - dataurl
 * @param filename - filename
 * @returns
 */
export function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(','),
    bstr = atob(arr[1]),
    mime = (arr[0].match(/:(.*?);/) ?? [])[1]
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

/**
 * @public
 * Get imageType from filename
 * @param str
 * @returns
 */
export function getImageType(str: string) {
  const idx = str.lastIndexOf('.')
  if (idx == -1) throw new Error(`Can't get the extension from string ${str}. `)
  const ret = str.slice(idx + 1)
  return ret
}
