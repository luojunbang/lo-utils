// eslint.config.js 或 eslint.config.mjs

import { defineConfig } from 'eslint/config'
import tsParser from '@typescript-eslint/parser'

import tslint from '@typescript-eslint/eslint-plugin'

export default defineConfig([
  {
    // 适用于所有文件
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest', // 或指定具体年，比如 2024
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        // 如果需要类型检查：
        // project 或 projectService
        //例子用 projectService + project:true
        project: true,
        projectService: true,
        tsconfigRootDir: import.meta.url ? new URL('.', import.meta.url).pathname : __dirname,
      },
      globals: {
        // 如果你有需要设置全局变量
      },
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/strict'],
    plugins: {
      '@typescript-eslint': tslint,
    },
    rules: {
      semi: ['error', 'never'],
      'no-extra-semi': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint.no-unused-expressions': 'off',
    },
    ignorePatterns: ['**/node_modules/', 'dist/*', 'lo-utils', '**/*.json', '*.md'],
    env: {
      browser: true,
      node: true,
      es6: true,
      jest: true,
    },
  },
  {
    // 针对 .js 文件的覆盖规则
    files: ['*.js'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: false, // 类型检查通常在 ts 文件里做
        projectService: false,
      },
    },
    rules: {
      // '@typescript-eslint/no-require-imports': 'off',
    },
  },
])
