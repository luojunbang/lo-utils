const chalk = require('chalk')
const loaderUtils = require('loader-utils')
const compiler_sfc_1 = require('vue/compiler-sfc')

const { getCssProperty } = require('./helper')

const qs = require('querystring')

function deepPriority(root, fn) {
  if (Array.isArray(root.children) && root.children.length > 0) {
    root.children.forEach((node, idx) => {
      fn(node, idx)
      deepPriority(node, fn)
    })
  }
}

function parseClass(className, prefix) {
  let style = ''
  try {
    const [attr, ...value] = className.replace(prefix, '').split('-')
    style = `.${className} { ${getCssProperty(attr)
      .split(',')
      .map(prop => `${prop} : ${value.join(' ')};`)
      .join('\n')}
    }`
  } catch (e) {
    console.log(e)
  }
  return style
}

const wrapStyleBlock = block => `\n  <style scoped> ${block}</style> \n`

module.exports = function loader(content) {
  const d = Date.now()
  const ctx = this
  const { prefix = '$' } = loaderUtils.getOptions(this)
  const isParseClass = klass => {
    return new RegExp(`\^\\${prefix}[\\w]+\-`).test(klass)
  }
  const { mode, target, sourceMap, rootContext, resourcePath, resourceQuery = '' } = ctx
  const incomingQuery = qs.parse(resourceQuery.slice(1))
  if (!(!resourceQuery || incomingQuery.type === 'style')) return content
  const { descriptor, errors } = compiler_sfc_1.parse(content, {})
  if (incomingQuery.type === 'style' && incomingQuery.index < descriptor.styles.length) return content
  const styles = new Set()
  deepPriority(descriptor.template.ast, node => {
    const classProps = node.props?.find(i => i.name === 'class')
    classProps &&
      classProps.value.content.split(' ').forEach(i => {
        isParseClass(i) && styles.add(i)
      })
  })
  const styleBlock = Array.from(styles).reduce((rs, klass) => rs + parseClass(klass, prefix), '')
  return content + wrapStyleBlock(styleBlock)
}
