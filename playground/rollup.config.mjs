import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

console.log(process.env.NODE_ENV)
export default {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  plugins: [nodeResolve({ browser: true })],
}
