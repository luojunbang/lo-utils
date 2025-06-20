#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const [, , command, fileRelPath] = process.argv

if (command !== 'copy' || !fileRelPath) {
  console.log(`Usage: npx lo-utils copy <file-relative-to-src>`)
  process.exit(1)
}

const srcBase = path.resolve(__dirname, '../src')
const srcPath = path.resolve(srcBase, fileRelPath)
const destDir = path.resolve(process.cwd(), 'src/utils')
const destPath = path.join(destDir, path.basename(fileRelPath))

// 如果源文件不存在：列出可用文件并提示
if (!fs.existsSync(srcPath)) {
  console.log(`❌ File not found: ${fileRelPath}`)
  console.log(`📂 Available files in lo-utils/src:`)

  const listFiles = (dir, prefix = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    let results = []
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const relative = path.relative(srcBase, fullPath)
      if (entry.isDirectory()) {
        results = results.concat(listFiles(fullPath, prefix + entry.name + '/'))
      } else {
        results.push(relative)
      }
    }
    return results
  }

  const availableFiles = listFiles(srcBase)
  availableFiles.forEach((file) => console.log(`- ${file}`))
  process.exit(1)
}

// 确保目标目录存在
fs.mkdirSync(destDir, { recursive: true })

// 如果目标已存在，确认是否覆盖
if (fs.existsSync(destPath)) {
  const { overwrite } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'overwrite',
      message: `⚠️ File already exists at src/utils/${path.basename(fileRelPath)}. Overwrite?`,
      default: false,
    },
  ])

  if (!overwrite) {
    console.log('❌ Copy cancelled. File not overwritten.')
    process.exit(0)
  }
}

// 执行复制
fs.copyFileSync(srcPath, destPath)
console.log(`✅ Copied: ${fileRelPath} → src/utils/${path.basename(fileRelPath)}`)
