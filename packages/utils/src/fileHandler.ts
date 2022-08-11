// 文件工具
import { AxiosResponse } from 'axios'

/**
 * @description
 * 静默iframe导出文件
 * @param url 请求地址
 */
export function getFileSilent(url: string): void {
  if (!window) throw new Error('This function need window env')
  //向后台发送请求
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  iframe.setAttribute('src', url)
}

export function generatorFile(fileName: string, blob: BlobPart, fileType = ''): void {
  const FILE_TYPE: Record<string, string> = {
    zip: 'application/zip;charset=utf-8',
    xls: 'application/vnd.ms-excel;charset=UTF-8',
    pdf: 'application/pdf;charset=utf-8',
  }
  console.log('fileType:', FILE_TYPE[fileType] ?? fileType)

  const url = window.URL.createObjectURL(new Blob([blob], { type: fileType }))

  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', fileName)
  a.style.display = 'none'
  document.body.append(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

export function parseFileName(contentDispotion: string | undefined): string {
  if (contentDispotion === undefined) return Math.random().toString(16).slice(2)
  if (/UTF-8/.test(contentDispotion)) return contentDispotion.replace(/[\s\S]+UTF-8''([\S\s]+\.[\S]+)/, '$1')
  return contentDispotion.replace(/\s*attachment;\s*filename="([\S\s]+\.[\S]+)"[\s\S]*/, '$1')
}

export function generatorFileAxios(res: AxiosResponse, fileName?: string, type?: string): void {
  const { headers, data } = res
  generatorFile(fileName ?? parseFileName(headers['content-disposition']), data, type)
}
