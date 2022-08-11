// const { compileTemplate } = require('@vue/component-compiler-utils')

module.exports = function (source) {
  // 在这里按照你的需求处理 source
  // this.cacheable(false)
  console.log('source start:')
  console.log(source)
  console.log('source end1:')
  console.log('-------------')
  console.log('ansContent start:')
  const ansContent = source.replace('$bg-red', 'style="background:red"')
  console.log(ansContent)
  console.log('ansContent end:')
  this.callback(null, ansContent)
  return
}
