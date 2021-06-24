module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['eslint:recommended'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],//'' ``
    'no-empty':['off']
  },
  parserOptions: {
    parser: 'babel-eslint',
    //note： {...a,b} ES2018 才将这个运算符引入了对象。
    ecmaVersion: 2018 
  }
}
