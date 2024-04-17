import path from 'path'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import ts from '@rollup/plugin-typescript'

const input = 'src/index.ts'

// const tsPlugin = ts({
//   check: true,
//   // tsconfig: path.resolve(__dirname, 'tsconfig.json'),
//   // cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
//   tsconfigOverride: {
//     compilerOptions: {
//       declaration: true,
//       declarationMap: true,
//     },
//     exclude: ['__tests__', 'test-dts'],
//   },
// })

// const babelPlugin = babel({
//   exclude:['node_modules']
// })

// const emsConfig = {
//   input: './src/index.ts',
//   output: {
//     file: 'dist/lo-utils.esm.js',
// ;     format: 'esm',
//   }

// ,
//   plugins: [tsplugin,babelplugin],
// plugins }

// const umdConfig = {
//   input: './src/index.ts',
//   output: {
//     file: 'dist/lo-utils.min.js',
// ;     name: 'loUtils',
// ;     format: 'umd',
//   }

// ,
//   plugins: [
//     tsPlugin,
//     terser({
//       compress: {
//         ecma: 'es5',
//         pure_getters: true,
//       },
//     }),
//   ],
// plugins }

const config = {
  input,
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [ts()]
}

export default config
