import ts from "rollup-plugin-typescript2";

import path from "path";

const tsPlugin = ts({
  check: true,
  tsconfig: path.resolve(__dirname, "tsconfig.json"),
  cacheRoot: path.resolve(__dirname, "node_modules/.rts2_cache"),
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
      declarationMap: true,
    },
    exclude: ["__tests__", "test-dts"],
  },
});

import babel from 'rollup-plugin-babel'

const babelPlugin = babel({
  exclude:["node_modules"]
})

const emsConfig = {
  input: "./src/index.ts",
  output: {
    file: "dist/lo-utils.esm.js",
    format: "esm",
  },
  plugins: [tsPlugin,babelPlugin],
};

import { terser } from "rollup-plugin-terser";

const umdConfig = {
  input: "./src/index.ts",
  output: {
    file: "dist/lo-utils.min.js",
    name: "loUtils",
    format: "umd",
  },
  plugins: [
    tsPlugin,
    terser({
      compress: {
        ecma: "es5",
        pure_getters: true,
      },
    }),
  ],
};

export default [emsConfig, umdConfig];
