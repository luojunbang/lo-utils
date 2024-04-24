import path, { resolve } from 'path'
import terser from '@rollup/plugin-terser'
import ts from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import fs from 'fs-extra'
import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel'

const { name } = fs.readJsonSync(path.resolve(import.meta.dirname, '../lo-utils/package.json'))
console.log('name:', name)

const broswerInput = 'src/index.brower.ts'
const input = 'src/index.ts'

const terserPlugin = () =>
  terser({
    compress: {
      ecma: 'es5',
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
    compilerOptions: {
      target,
      outDir: './dist',
      declaration: false,
      declarationMap: false,
    },
    exclude: ['__tests__/*'],
  })

const outpuFile = (name) => path.resolve(import.meta.dirname, `./dist/${name}`)

export default [
  {
    input: broswerInput,
    output: {
      file: outpuFile(`${name}.min.js`),
      name: 'loUtils',
      format: 'umd',
    },
    plugins: [tsPlugin(), , nodeResolve(), commonjs(), terserPlugin()],
  },
  {
    input: broswerInput,
    output: {
      file: outpuFile(`${name}.es5.min.js`),
      name: 'loUtils',
      format: 'umd',
    },
    plugins: [tsPlugin('es5'), , nodeResolve(), commonjs(), terserPlugin()],
  },
  ...['', 'min'].reduce((rs, min) => {
    rs.push({
      input: broswerInput,
      output: {
        file: outpuFile([name, 'broswer', 'esm', min, 'js'].filter((i) => i).join('.')),
        format: 'esm',
      },
      plugins: [tsPlugin(), ...(min ? [terserPlugin()] : [])],
    })
    rs.push({
      input,
      output: {
        file: outpuFile([name, 'cjs', min, 'js'].filter((i) => i).join('.')),
        format: 'cjs',
      },
      plugins: [tsPlugin(), nodeResolve(), ...(min ? [terserPlugin()] : [])],
    })
    rs.push({
      input,
      output: {
        file: outpuFile([name, 'esm', min, 'js'].filter((i) => i).join('.')),
        format: 'esm',
      },
      plugins: [tsPlugin(), nodeResolve(), ...(min ? [terserPlugin()] : [])],
    })
    return rs
  }, []),
]
