import globals from 'globals'

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

const config = [
  ...tseslint.config({
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.stylistic],
    files: ['*.mjs'],
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
    ignores: ['**/node_modules/', 'dist/**', 'lo-utils'],
  }),
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
]

export default config
