import { readFileSync } from 'fs-extra'
import { getExt } from './fileHandler'

export function image2Base64(filePath: string) {
  const fileBase64Code = readFileSync(filePath).toString('base64')
  return encodeURI(`data:image/${getExt(filePath)};base64,${fileBase64Code}`)
}
