import { loUtilsOutput, loUtilsPkg, loUtilsRoot } from '@lo/build-helper'
import { execa, $ } from 'execa'
import fs from 'fs-extra'
import { resolve } from 'path'
console.log('loUtilsOutput:', loUtilsOutput)

async function buildModule() {
  const { stdout } = await $({ stdio: 'inherit' })`pnpm build:module`
  console.log('buildModule.stdout:', stdout)
}

async function buildTypeDefination() {
  const { stdout } = await $({ stdio: 'inherit' })`pnpm build:dts`
  console.log('buildTypeDefination.stdout:', stdout)
}

async function init() {
  await buildModule()
  await buildTypeDefination()
  await fs.copyFile(loUtilsPkg, resolve(loUtilsOutput, 'package.json'))
  await fs.copyFile(resolve(loUtilsRoot, 'README.md'), resolve(loUtilsOutput, 'README.md'))
}

init()
