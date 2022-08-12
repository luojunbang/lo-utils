import * as webpack from 'webpack'
import { parse } from '@vue/compiler-sfc'
import { NodeTypes } from '@vue/compiler-core'
import * as loaderUtils from 'loader-utils'

import { wrapStyleBlock, parseClass } from './helper'

import * as qs from 'querystring'

import { deepPriority,getParams } from 'lo-utils'

export interface parseClassOptions {
  prefix?: string
}

export default function loader(this: webpack.loader.LoaderContext, content: string) {
  const ctx = this
  const { prefix = 'L' } = (loaderUtils.getOptions(ctx) || {}) as parseClassOptions
  const isParseClass = (className: string) => {
    return new RegExp(`\^\\${prefix}[\\w]+\-`).test(className)
  }
  const { resourceQuery = '' } = ctx
  const incomingQuery = getParams(resourceQuery.slice(1))
  if (!(!resourceQuery || incomingQuery.type === 'style')) return content
  const { descriptor, errors } = parse(content, {})
  if (incomingQuery.type === 'style' && Number(incomingQuery.index) < descriptor.styles.length) return content
  const styles: Set<string> = new Set()
  descriptor.template &&
    deepPriority(descriptor.template.ast, node => {
      const classProps = node.props?.find(i => i.name === 'class')
      if (classProps?.type === NodeTypes.ATTRIBUTE) {
        classProps.value?.content.split(' ').forEach(i => {
          isParseClass(i) && styles.add(i)
        })
      }
    })
  const styleBlock: string = Array.from(styles).reduce((rs, klass) => rs + parseClass(klass, prefix), '')
  return content + wrapStyleBlock(styleBlock) + '\n'
}
