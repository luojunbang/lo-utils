import { execa, $ } from 'execa'
import { utilsRoot, utilsOutput, utilsPkg } from '@lo/build-helper'
import { copyFile, outputJSON, readJSON } from 'fs-extra'
import { resolve } from 'path'
import { omit } from '../src'

const { TAG_VERSION, GIT_HEAD } = process.env
console.log('TAG_VERSION:', TAG_VERSION)

async function buildModule() {
  await $({ stdio: 'inherit' })`pnpm build:module`
}

async function buildTypeDefination() {
  await $({ stdio: 'inherit' })`pnpm build:dts`
}

async function modifyPkg() {
  const pkg = await readJSON(utilsPkg)
  const [_, version] = TAG_VERSION?.split('/') ?? []
  await outputJSON(
    resolve(utilsOutput, 'package.json'),
    {
      ...omit(pkg, ['devDependencies']),
      version: version ?? pkg.version,
      gitHead: GIT_HEAD,
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
