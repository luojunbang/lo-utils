import { resolve } from 'path'
import { readJSONSync } from 'fs-extra'

export const projRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')

export const utilsRoot = resolve(pkgRoot, './utils/')
export const utilsPkg = resolve(utilsRoot, './package.json')

export const buildUtilsRoot = resolve(pkgRoot, './build-helper/')

export const buildOutput = resolve(projRoot, './dist')
export const utilsOutput = resolve(buildOutput, readJSONSync(utilsPkg).name)
