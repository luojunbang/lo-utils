/** @type {import('stylelint').Config} */
const config = {
  processors: [],
  plugins: ['stylelint-order', 'stylelint-scss'],
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'], // 这是官方推荐的方式
  rules: {
    // at-rule-no-unknown: 屏蔽一些scss等语法检查
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
  },
  ignoreFiles: ['**/*.js'],
}
export default config
