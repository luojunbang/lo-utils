import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  plugins: [
    // commonjs(),
    nodeResolve({
      mainFields: ['browser'],
      resolveOnly: ['lo-utils'],
    }),
  ],
}
