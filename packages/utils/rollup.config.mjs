import { resolve } from 'path'
import terser from '@rollup/plugin-terser'
import ts from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import fs from 'fs-extra'
import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel'
import { utilsPkg, utilsOutput } from '@lo/build-helper'
import json from '@rollup/plugin-json'

const { name: PKG_NAME, peerDependencies } = fs.readJsonSync(utilsPkg)

const browserInput = 'src/index.browser.ts'
const input = 'src/index.ts'

const terserPlugin = () =>
  terser({
    compress: {
      ecma: 5,
      pure_getters: true,
    },
  })

const babelPlugin = () =>
  babel({
    babelHelpers: 'bundled',
    presets: [
      [
        '@babel/preset-env',
        {
          shippedProposals: true,
          modules: false,
          corejs: { version: '3.8', proposals: true },
          useBuiltIns: 'usage', // This option configures how @babel/preset-env handles polyfills.
        },
      ],
    ],
    exclude: ['node_modules/**', 'dist'],
    extensions: ['.ts'],
  })

const tsPlugin = (target = 'es6') =>
  ts({
    tsconfig: './tsconfig.json',
    compilerOptions: {
      target,
      declaration: false,
      declarationMap: false,
    },
    exclude: ['__tests__'],
  })

const outpuFile = (name) => resolve(utilsOutput, 'dist', `./${name}`)

const browserConfig = [
  /** es6 browser */
  {
    input: browserInput,
    output: {
      file: outpuFile(`${PKG_NAME}.min.js`),
      name: 'loUtils',
      format: 'umd',
    },
    plugins: [tsPlugin(), nodeResolve(), commonjs(), terserPlugin()],
  },
  {
    /** es5 browser */
    input: browserInput,
    output: {
      file: outpuFile(`${PKG_NAME}.es5.min.js`),
      name: 'loUtils',
      format: 'umd',
    },
    plugins: [tsPlugin('es5'), babelPlugin(), nodeResolve(), commonjs(), terserPlugin()],
  },
  /** es5 browser esm */
  {
    input: browserInput,
    output: [
      {
        file: outpuFile(`${PKG_NAME}.browser.esm.js`),
        format: 'esm',
      },
      {
        file: outpuFile(`${PKG_NAME}.browser.esm.min.js`),
        format: 'esm',
        plugins: [terserPlugin()],
      },
    ],
    plugins: [tsPlugin()],
  },
]

console.log('peerDependencies:', peerDependencies)

const nodeConfig = {
  external: Object.keys(peerDependencies),
  input,
  output: [
    {
      file: outpuFile(`${PKG_NAME}.esm.js`),
      format: 'esm',
    },
    {
      file: outpuFile(`${PKG_NAME}.cjs.js`),
      format: 'cjs',
    },
    {
      file: outpuFile(`${PKG_NAME}.cjs.min.js`),
      format: 'cjs',
      plugins: [terserPlugin()],
    },
  ],
  plugins: [tsPlugin(), nodeResolve()],
}

export default [nodeConfig, ...browserConfig]
