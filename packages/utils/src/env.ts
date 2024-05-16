import dotenv from 'dotenv'
import { glob } from 'fast-glob'
import path from 'path'
import { readFileSync } from 'fs-extra'

/**
 * 加载 .env 文件
 * @public
 */
export function loadEnv() {
  const mode = process.env.NODE_ENV ?? 'development'
  const envList = [`.env`, '.env.local', `.env.${mode}`, `.env.${mode}.local`]
  const root = path.resolve(__dirname).split('/node_modules')[0]
  console.warn()
  const list = glob.sync(envList, { cwd: root, onlyFiles: true })
  list.forEach(async (path) => {
    const obj = dotenv.parse(readFileSync(path, 'utf-8'))
    Object.keys(obj).forEach((key) => (process.env[key] = obj[key]))
  })
}
