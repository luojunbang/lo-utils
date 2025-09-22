import { $ } from 'execa'
import { utilsRoot, utilsOutput, utilsPkg } from '@lo/build-helper'
import { copyFile, copySync, lstatSync, outputJSON, readJSON } from 'fs-extra'
import { resolve } from 'path'
import { omit } from '../src'

async function buildModule() {
  await $({ stdio: 'inherit', preferLocal: true })`npm run build:module`
}

async function buildTypeDefination() {
  await $({ stdio: 'inherit', preferLocal: true })`npm run build:dts`
}

async function modifyPkg() {
  const { TAG_VERSION, GIT_HEAD } = process.env
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
  await copySync(resolve(utilsRoot, './src'), resolve(utilsOutput, './src'))
  await copySync(resolve(utilsRoot, './bin'), resolve(utilsOutput, './bin'))
  await Promise.all([buildModule(), buildTypeDefination()])
  await Promise.all([modifyPkg(), copyFile(resolve(utilsRoot, 'index.js'), resolve(utilsOutput, 'index.js')), copyFile(resolve(utilsRoot, 'README.md'), resolve(utilsOutput, 'README.md'))])
  copySync(resolve(utilsRoot, 'dist'), resolve(utilsOutput, 'dist'), {
    filter(src) {
      if (src === resolve(utilsRoot, 'dist')) return true
      return /(min|cjs|esm).js$/.test(src)
    },
  })
}

init()
