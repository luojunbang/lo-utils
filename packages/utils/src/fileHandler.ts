// 文件工具
import { AxiosResponse } from 'axios'
import { join } from 'path'
import fs from 'fs'

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

  const url = window.URL.createObjectURL(
    new Blob([blob], { type: FILE_TYPE[fileType] ?? fileType }),
  )

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
  if (/UTF-8/.test(contentDispotion))
    return contentDispotion.replace(/[\s\S]+UTF-8''([\S\s]+\.[\S]+)/, '$1')
  return contentDispotion.replace(/\s*attachment;\s*filename="([\S\s]+\.[\S]+)"[\s\S]*/, '$1')
}

/**
 * axios下载文件封装
 * @public
 * @param res - axios response
 * @param fileName - custom filename or request header filename
 * @param type - file type such as (xls,zip,pdf) or the original fileType in mdn
 */
export function generatorFileAxios(res: AxiosResponse, fileName?: string, type?: string): void {
  const { headers, data } = res
  generatorFile(fileName ?? parseFileName(headers['content-disposition']), data, type)
}

/**
 * dataURLtoFile
 * @public
 * @param dataurl
 * @param filename
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
 * 打印文件结构
 * @public
 * @param rootPath 根目录
 * @param exclude 需要排除的文件名或者目录
 */
export function logFileStruct(rootPath: string, exclude = ['node_modules', '.git']) {
  const [subdir, place, file] = ['├──', '|   ', '└──']

  console.log(`${rootPath}\n.`)
  const deepSearchFile = (path: string, prefix) => {
    const list = fs.readdirSync(path)
    const dir: [string, boolean][] = []
    const fileList: [string, boolean][] = []
    list.forEach((p) => {
      if (exclude.includes(p)) return
      const _path = join(path, p)
      const fileStat = fs.statSync(_path)
      if (fileStat.isDirectory()) {
        dir.push([p, true])
      } else {
        fileList.push([p, false])
      }
    })
    ;[...dir, ...fileList].forEach(([p, isDir], index, arr) => {
      const _path = join(path, p)
      const mark = index == arr.length - 1 ? file : subdir
      if (isDir) {
        console.log(`${prefix}${mark} ${p}`)
        deepSearchFile(_path, prefix + place)
      } else {
        console.log(`${prefix}${mark} ${p}`)
      }
    })
  }

  const fileStat = fs.statSync(rootPath)
  if (fileStat.isDirectory()) {
    deepSearchFile(rootPath, '')
  } else {
    console.log(`${file} ${rootPath}`)
  }
}
