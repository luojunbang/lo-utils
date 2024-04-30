import { execa, $ } from 'execa'
import { copyFile } from 'fs-extra'
import { resolve } from 'path'

const { argv } = process

const [pkgName = 'utils'] = process.argv.slice(2)

import { utilsRoot, utilsOutput, utilsPkg } from '@lo/build-helper'
async function init() {
  await $`pnpm clean`
  await $`pnpm run -C ./packages/${pkgName} build`
}

init()
