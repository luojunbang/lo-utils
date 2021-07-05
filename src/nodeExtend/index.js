const fs = require('fs')
const { join } = require('path')
module.exports = {
  checkDirExist
}

function checkDirExist(path = './') {
  if (/^\//.test(path)) throw new Error('Please no RootPath')
  // toDo.. check path 有非法字符
  const path_ary = path.split('/')
  path_ary.forEach((_, idx) => {
    const path = join(__dirname, path_ary.slice(0, idx + 1).join('/'))
    try {
      const _stat = fs.statSync(path)
    } catch (err) {
      const { code } = err
      if (code === 'ENOENT') {
        console.log(`checkout... ${path} not exist!!`)
        fs.mkdirSync(path)
        console.log(`mkdir... ${path} success!!`)
      }
    }
  })
}
