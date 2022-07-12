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
      declarationDir: path.resolve(__dirname, 'dist/src'),
    },
    exclude: ['__tests__', 'test-dts'],
  },
})

const config = {
  input: './src/index.ts',
  output: {
    file: 'dist/lo-utils.esm.js',
    format: 'esm',
  },
  plugins: [tsPlugin],
}

export default config
