const fs = require('file-system')

let utils_markdown = `
# lo-utils

## 安装

\`\`\`sh
npm i lo-utils --save
\`\`\`

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
