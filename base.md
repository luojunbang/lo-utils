# 创建一个协作的前端项目

利用脚手架或者`npm init`

## 安装代码格式化工具

### 安装 prettier

`pnpm add prettier -D`

### 安装 stylelint

`pnpm i stylelint stylelint-config-recess-order stylelint-config-standard stylelint-order stylelint-scss -D`

添加配置

```js
// <ROOT_DIR>/stylelint.config.mjs
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
}

module.exports = config
```

### 安装 eslint

`pnpm create @eslint/config` 根据提示完成操作

或者

`pnpm add --save-dev eslint @eslint/js typescript typescript-eslint`

参见 [typescript-eslint](https://typescript-eslint.io/packages/typescript-eslint#config)

添加基本配置

```js
// <ROOT_DIR>/eslint.config.mjs
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
]

export default config
```

## 安装 husky

`pnpm add --save-dev husky`

参见 [Husky](https://typicode.github.io/husky/get-started.html)

初始化husky

`pnpm exec husky init`

添加 `prepare` 命令在 `package.json` 中

> In a package.json file, the "prepare" script is a special script that gets executed before the package is packed and published. When you run npm install in a package directory, it prepares the package for use.

## 安装 lint-staged

`pnpm add lint-staged`

添加 `lint-staged` 到 `pre-commit` 中

`echo "pnpm exec lint-staged --concurrent false" >> .husky/pre-commit`

为了避免冲突，通过 `--concurrent false` 取消并发

添加 `lint-staged` 到 `package.json` 中

```json
{
  // ...
  "lint-staged": {
    "*.{vue,js,ts,jsx,tsx,md,json}": ["eslint --fix", "prettier -w"],
    "*.{css,scss,sass,less}": ["stylelint \"**/*.{css,scss,less,sass}\" --fix", "prettier -w"]
  }
}
```

## 安装 commit message 校验工具

`pnpm add -D @commitlint/{cli,config-conventional}`

增加 `commit-msg` hook

`echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg`

```js
// <ROOT_DIR>/commitlint.config.ts
import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    /**
     * type[scope]: [function] description
     *
     * ^^^^^^^^^^^^^^ empty line.
     * - Something here
     */
    'body-leading-blank': [1, 'always'],
    /**
     * type[scope]: [function] description
     *
     * - something here
     *
     * ^^^^^^^^^^^^^^
     */
    'footer-leading-blank': [1, 'always'],
    /**
     * type[scope]: [function] description
     * ^^^^
     */
    'type-enum': [2, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'release', 'style', 'test', 'improvement']],
  },
}

export default config
```
