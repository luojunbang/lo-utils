/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended', 'stylelint-config-recess-order'],
  plugins: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': null,
    'scss/selector-no-redundant-nesting-selector': true,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'custom-property-empty-line-before': 'never',
    indentation: 2,
    'number-leading-zero': 'always',
    'string-quotes': 'single',
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'block-opening-brace-space-before': 'always',
    'declaration-colon-space-after': 'always',
    'max-empty-lines': 1,
    'no-eol-whitespace': true,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'after-dollar-variable'],
        ignore: ['after-comment'],
      },
    ],
    'scss/at-extend-no-missing-placeholder': true,
    'scss/percent-placeholder-pattern': '^%',
  },
}

export default config
