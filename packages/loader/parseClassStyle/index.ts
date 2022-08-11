import { parse } from '@vue/compiler-sfc'
import { NodeTypes } from '@vue/compiler-core'
import * as loaderUtils from 'loader-utils'

import { getCssProperty } from './helper'

import * as qs from 'querystring'

import { deepPriority } from 'lo-utils'

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

export interface parseClassOptions {
  prefix: string
}

const wrapStyleBlock = block => `\n  <style scoped> ${block}</style> \n`

export default function loader(content) {
  const d = Date.now()
  const ctx = this
  const { prefix = '$' } = (loaderUtils.getOptions(ctx) || {}) as parseClassOptions
  const isParseClass = klass => {
    return new RegExp(`\^\\${prefix}[\\w]+\-`).test(klass)
  }
  const { mode, target, sourceMap, rootContext, resourcePath, resourceQuery = '' } = ctx
  const incomingQuery = qs.parse(resourceQuery.slice(1))
  if (!(!resourceQuery || incomingQuery.type === 'style')) return content
  const { descriptor, errors } = parse(content, {})
  if (incomingQuery.type === 'style' && Number(incomingQuery.index) < descriptor.styles.length) return content
  const styles = new Set()
  descriptor.template &&
    deepPriority(descriptor.template.ast, node => {
      const classProps = node.props?.find(i => i.name === 'class')
      if ( classProps?.type === NodeTypes.ATTRIBUTE) {
        classProps.value?.content.split(' ').forEach(i => {
          isParseClass(i) && styles.add(i)
        })
      }
    })
  const styleBlock = Array.from(styles).reduce((rs, klass) => rs + parseClass(klass, prefix), '')
  return content + wrapStyleBlock(styleBlock)
}
