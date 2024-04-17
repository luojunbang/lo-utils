import globals from 'globals'

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

const config = [
  ...tseslint.config({
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.stylistic],
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }),
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    ignores: ['.config/*'],
  },
]

export default config
