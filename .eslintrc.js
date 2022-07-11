module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'eslint-config-prettier', 'plugin:@typescript-eslint/recommended'],
  plugins: ['prettier'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'], //'' ``
    'no-empty': ['off'],
    'no-unused-vars': ['off'],
    'no-undef': ['off'],
    'no-case-declarations': 'off',
    'space-before-function-paren': ['off', 'always'],
    'no-extra-semi': 'error',
    'no-irregular-whitespace': 'error',
    'prettier/prettier': [
      'error',
      {
        // trailingComma: 'none',
        arrowParens: 'avoid',
        eslintIntegration: true,
        singleQuote: true,
        semi: false,
        printWidth: 200,
        wrapAttributes: false,
        sortAttributes: false,
        bracketSpacing: true,
        tabWidth: 2,
        endOfLine: 'auto',
      },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    //note： {...a,b} ES2018 才将这个运算符引入了对象。
    ecmaVersion: 2018,
  },
}
