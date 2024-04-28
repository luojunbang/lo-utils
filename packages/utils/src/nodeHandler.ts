import { join } from 'path'
import * as fs from 'fs'

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
