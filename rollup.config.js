import ts from 'rollup-plugin-typescript2'

import path from 'path'

const tsPlugin = ts({
  check: true,
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
      declarationMap: true,
    },
    exclude: ['__tests__', 'test-dts'],
  },
})

const emsConfig = {
  input: './src/index.ts',
  output: {
    file: 'dist/lo-utils.esm.js',
    format: 'esm',
  },
  plugins: [tsPlugin],
}

const { terser } = require('rollup-plugin-terser')

const umdConfig = {
  input: './src/index.ts',
  output: {
    file: 'dist/lo-utils.min.js',
    name: 'lou',
    format: 'umd',
  },
  plugins: [
    tsPlugin,
    terser({
      compress: {
        ecma: 2015,
        pure_getters: true,
      },
    }),
  ],
}

export default [emsConfig, umdConfig]
