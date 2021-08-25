const fs = require('file-system')

let utils_markdown = `
# lo-utils

## 安装

\`\`\`sh
npm i lo-utils --save
\`\`\`

## 使用
\`\`\`js
import { fmtDate } from 'lo-utils'
\`\`\`

## 公共样式说明

### 导入
\`\`\`js
import 'YOUR_VARIABLES.scss' //具体变量名称见 'lo-utils/style/base/_variables.scss'
import 'lo-utils/style/index.scss';
\`\`\`

### 边距 (mg | pd)-(大小)-(方向)
* 大小：base(可无) | lg | sm | xs
* 方向：t | r | b | l | lr(左右) | tb(上下)
* 其他：mg0auto(margin:0 auto)
\n例如：左方基础外边距,:class="mg-l"左方大外边距:class="mg-l-lg",左右小内边距 class="pd-lr-sm"

### 定位
* 定位：relative | absolute | fixed
* 类名：row-center | col-center | {(left | middle | right)-(t | m | b)} | full
\n例如：一行垂直居中对齐 class="middle-m"

### flex布局
* 布局：flex-(row | column)-(reverse?) | flex-row-nowrap(flex-row align-center justify-center)
* 横向：justify-(start | end | center | between | around)
* 垂直：align-(start | end | center | stretch)
* 自身：self-(start | end | center | stretch)
\n例如：一行垂直居中对齐 class="flex-row align-center justify-center"

### 文字 text
* 大小：base(可无)｜lg｜sm
* 行高：[lh] text-lh-(lg[2] | sm[1.2] | [1.5])
* 粗细：text-(bold | light)
* 对齐：text-(left | right | center)
* 其他：text-(ABC | Abc | abc | cut[超过省略号] | 2cut[两行超过省略号])
* 下划线 underline

### 瞄边 border
* border-(base | t | r | b | l)-(none?)
`

exports.doc = function (path) {
  fs.recurseSync(path, function (path, name) {
    if (name) {
      utils_markdown += generatorREADME(path) + '\n\n\n'
    }
  })
  fs.writeFileSync('README.md', utils_markdown)
}

function generatorREADME(path) {
  const fileName = '## ' + path.slice(path.lastIndexOf('/') + 1) + '\n'
  const content = fs.readFileSync(path, 'utf-8')
  const list = content.replace(/\r|\n/g, '').split('/**')
  const fileDescription = '* ' + list[0].replace(/\//g, '') + '\n'
  return list.slice(1).reduce((rs, func) => {
    const idx = func.indexOf('exports')
    const name = func.replace(/^[\s\S]*exports.([\w+]+)[\s\S]*=[\s\S]*function[\s\S]*$/g, '### $1 \n') //标题3
    if (idx === -1) return rs + name
    const md = func.slice(0, func.indexOf('exports')).replace(/\*|\//g, '').split('@') //提取函数注释
    const ret = md.reduce((rs, txt) => {
      //拼接注释为markdown
      if (txt.replace(/\s/g, '') === '') return rs
      else {
        if (txt.indexOf('```') !== -1) txt = txt.replace(/[\s]{2,10}/g, '\n')
        rs += '* ' + txt + '\n'
        return rs
      }
    }, name)
    return (rs += ret + '\n')
  }, fileName + fileDescription)
}
