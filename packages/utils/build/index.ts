import { execa, $ } from 'execa'
import { utilsRoot, utilsOutput, utilsPkg } from '@lo/build-helper'
import { copyFile, readJSON, writeJSON } from 'fs-extra'
import { resolve } from 'path'
import { write } from 'fs'
import { exclude } from '../src'
import { version } from 'os'

async function buildModule() {
  await $({ stdio: 'inherit' })`pnpm build:module`
}

async function buildTypeDefination() {
  await $({ stdio: 'inherit' })`pnpm build:dts`
}

async function modifyPkg() {
  const pkg = await readJSON(utilsPkg)
  await writeJSON(
    resolve(utilsOutput, 'package.json'),
    {
      ...exclude(pkg, ['devDependencies']),
      version: '2.3.4',
    },
    {
      spaces: '\t',
    },
  )
}

async function init() {
  await Promise.all([buildModule(), buildTypeDefination()])
  await Promise.all([modifyPkg(), copyFile(resolve(utilsRoot, 'index.js'), resolve(utilsOutput, 'index.js')), copyFile(resolve(utilsRoot, 'README.md'), resolve(utilsOutput, 'README.md'))])
}

init()
