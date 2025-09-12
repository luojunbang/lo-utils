import tsParser from '@typescript-eslint/parser'
import tseslint from '@typescript-eslint/eslint-plugin'

export default [
  {
    plugins: {
      // key 必须是字符串名，value 必须是插件对象
      '@typescript-eslint': tseslint,
    },
    rules: {
      semi: ['error', 'never'],
      'no-extra-semi': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
    ignores: ['**/node_modules/', 'dist/*', 'lo-utils', '**/*.json', '*.md'],
  },
  {
    files: ['*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
