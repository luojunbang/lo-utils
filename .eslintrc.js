module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'], //
  plugins: ['@typescript-eslint', 'jest'], //
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'], //'' ``
    'no-empty': ['off'],
    'no-unused-vars': ['off'],
    'no-undef': ['off'],
    'no-case-declarations': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'space-before-function-paren': ['off', 'always'],
    'no-extra-semi': 'off',
    'no-irregular-whitespace': 'error',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    //note： {...a,b} ES2018 才将这个运算符引入了对象。
    ecmaVersion: 2018,
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    // tests, no restrictions (runs in Node / jest with jsdom)
    {
      files: ['**/__tests__/**', 'test-dts/**'],
      rules: {
        'no-restricted-globals': 'off',
        'no-restricted-syntax': 'off',
        'jest/no-disabled-tests': 'error',
        'jest/no-focused-tests': 'error',
      },
    },
  ],
}
