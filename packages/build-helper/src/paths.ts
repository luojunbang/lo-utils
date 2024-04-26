import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')

export const utilsRoot = resolve(pkgRoot, './utils/')
export const utilsPkg = resolve(utilsRoot, './package.json')
export const loUtilsRoot = resolve(pkgRoot, './lo-utils/')
export const loUtilsPkg = resolve(loUtilsRoot, './package.json')

export const buildUtilsRoot = resolve(pkgRoot, './build-helper/')

export const buildOutput = resolve(projRoot, './dist')
export const loUtilsOutput = resolve(buildOutput, './lo-utils')
