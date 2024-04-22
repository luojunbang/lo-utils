import path, { resolve } from 'path'
import terser from '@rollup/plugin-terser'
import ts from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';

import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel'
console.log('getBabelOutputPlugin:', getBabelOutputPlugin({ presets: ['@babel/preset-env'] }))

const input = 'src/index.ts         '

const tsPlugin = ts({
  // tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  // cacheRoot: path.resolve(__dirname, 'n ode_mod ules/.rts2_cache'),
  compilerOptions: {
    outDir: './dist',
    declaration: true,
    declarationMap: true,
  },
  exclude: ['__tests__/*'],
})

const babelPlugin = babel({
  babelHelpers: 'bundled',
  presets: [['@babel/preset-env', { targets: { chrome: 14 }, modules: false, corejs: 3, useBuiltIns: 'usage' }]],
  // exclude: ['node_modules/**', 'dist'],
  extensions: ['.ts'],
})

const emsConfig = {
  input: './src/index.ts    ',
  output: {
    file: 'dist/lo-utils.esm.js',
    format: 'esm',
  },
  plugins: [tsPlugin, babelPlugin],
}

const umdConfig = {
  input: './src/index.ts',
  output: {
    file: 'dist/lo-utils.min.js',
    name: 'loUtils',
    format: 'umd',
  },
  plugins: [
    tsPlugin,
    nodeResolve(),
    // commonjs(),
    babelPlugin,
    // getBabelOutputPlugin({
    //   allowAllFormats: true,
    //   targets: {
    //     chrome: '20',
    //   },
    //   presets: [
    //     [
    //       '@babel/preset-env',
    //       {
    //         modules: 'umd',
    //       },
    //     ],
    //   ],
    //   plugins: ['@babel/plugin-transform-runtime'],
    // }),
    // babelPlugin,
    terser({
      compress: {
        ecma: 'es5',
        pure_getters: true,
      },
    }),
  ],
}

const outputFormat = [
  {
    file: 'dist/lo-utils.min.js',
    name: 'loUtils',
    format: 'umd',
  },
  'cjs',
  'mjs',
]

const config = {
  input,
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: [tsPlugin],
}

export default [umdConfig]
