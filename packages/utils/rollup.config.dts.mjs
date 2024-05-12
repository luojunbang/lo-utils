// @ts-check
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import dts from 'rollup-plugin-dts'
import { resolve } from 'node:path'

import { utilsOutput } from '@lo/build-helper'

const dtsOuputPath = resolve(import.meta.dirname, 'dist')

if (!existsSync(dtsOuputPath)) {
  console.warn('no dist dts files found. run `tsc` first.')
  process.exit(1)
}

export default {
  input: resolve(dtsOuputPath, 'src/index.d.ts'),
  output: {
    file: resolve(utilsOutput, 'index.d.ts'),
    format: 'es',
  },
  plugins: [dts()],
  onwarn(warning, warn) {
    warn(warning)
  },
}

/**
 * Patch the dts generated by rollup-plugin-dts
 * 1. Convert all types to inline exports
 *    and remove them from the big export {} declaration
 *    otherwise it gets weird in vitepress `defineComponent` call with
 *    "the inferred type cannot be named without a reference"
 * 2. Append custom augmentations (jsx, macros)
 *
 * @param {string} pkg
 * @returns {import('rollup').Plugin}
 */
// function patchTypes(pkg) {
//   return {
//     name: 'patch-types',
//     renderChunk(code, chunk) {
//       const s = new MagicString(code)
//       const ast = parse(code, {
//         plugins: ['typescript'],
//         sourceType: 'module',
//       })

//       /**
//        * @param {import('@babel/types').VariableDeclarator | import('@babel/types').TSTypeAliasDeclaration | import('@babel/types').TSInterfaceDeclaration | import('@babel/types').TSDeclareFunction | import('@babel/types').TSInterfaceDeclaration | import('@babel/types').TSEnumDeclaration | import('@babel/types').ClassDeclaration} node
//        * @param {import('@babel/types').VariableDeclaration} [parentDecl]
//        */
//       function processDeclaration(node, parentDecl) {
//         if (!node.id) {
//           return
//         }
//         assert(node.id.type === 'Identifier')
//         const name = node.id.name
//         if (name.startsWith('_')) {
//           return
//         }
//         shouldRemoveExport.add(name)
//         if (isExported.has(name)) {
//           const start = (parentDecl || node).start
//           assert(typeof start === 'number')
//           s.prependLeft(start, `export `)
//         }
//       }

//       const isExported = new Set()
//       const shouldRemoveExport = new Set()

//       // pass 0: check all exported types
//       for (const node of ast.program.body) {
//         if (node.type === 'ExportNamedDeclaration' && !node.source) {
//           for (let i = 0; i < node.specifiers.length; i++) {
//             const spec = node.specifiers[i]
//             if (spec.type === 'ExportSpecifier') {
//               isExported.add(spec.local.name)
//             }
//           }
//         }
//       }

//       // pass 1: add exports
//       for (const node of ast.program.body) {
//         if (node.type === 'VariableDeclaration') {
//           processDeclaration(node.declarations[0], node)
//           if (node.declarations.length > 1) {
//             assert(typeof node.start === 'number')
//             assert(typeof node.end === 'number')
//             throw new Error(
//               `unhandled declare const with more than one declarators:\n${code.slice(
//                 node.start,
//                 node.end,
//               )}`,
//             )
//           }
//         } else if (
//           node.type === 'TSTypeAliasDeclaration' ||
//           node.type === 'TSInterfaceDeclaration' ||
//           node.type === 'TSDeclareFunction' ||
//           node.type === 'TSEnumDeclaration' ||
//           node.type === 'ClassDeclaration'
//         ) {
//           processDeclaration(node)
//         }
//       }

//       // pass 2: remove exports
//       for (const node of ast.program.body) {
//         if (node.type === 'ExportNamedDeclaration' && !node.source) {
//           let removed = 0
//           for (let i = 0; i < node.specifiers.length; i++) {
//             const spec = node.specifiers[i]
//             if (
//               spec.type === 'ExportSpecifier' &&
//               shouldRemoveExport.has(spec.local.name)
//             ) {
//               assert(spec.exported.type === 'Identifier')
//               const exported = spec.exported.name
//               if (exported !== spec.local.name) {
//                 // this only happens if we have something like
//                 //   type Foo
//                 //   export { Foo as Bar }
//                 continue
//               }
//               const next = node.specifiers[i + 1]
//               if (next) {
//                 assert(typeof spec.start === 'number')
//                 assert(typeof next.start === 'number')
//                 s.remove(spec.start, next.start)
//               } else {
//                 // last one
//                 const prev = node.specifiers[i - 1]
//                 assert(typeof spec.start === 'number')
//                 assert(typeof spec.end === 'number')
//                 s.remove(
//                   prev
//                     ? (assert(typeof prev.end === 'number'), prev.end)
//                     : spec.start,
//                   spec.end,
//                 )
//               }
//               removed++
//             }
//           }
//           if (removed === node.specifiers.length) {
//             assert(typeof node.start === 'number')
//             assert(typeof node.end === 'number')
//             s.remove(node.start, node.end)
//           }
//         }
//       }
//       code = s.toString()

//       // append pkg specific types
//       const additionalTypeDir = `packages/${pkg}/types`
//       if (existsSync(additionalTypeDir)) {
//         code +=
//           '\n' +
//           readdirSync(additionalTypeDir)
//             .map(file => readFileSync(`${additionalTypeDir}/${file}`, 'utf-8'))
//             .join('\n')
//       }
//       return code
//     },
//   }
// }

/**
 * According to https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#packagejson-exports-imports-and-self-referencing
 * the only way to correct provide types for both Node ESM and CJS is to have
 * two separate declaration files, so we need to copy vue.d.ts to vue.d.mts
 * upon build.
 *
 * @returns {import('rollup').Plugin}
 */
function copyMts() {
  return {
    name: 'copy-vue-mts',
    writeBundle(_, bundle) {
      assert('code' in bundle['vue.d.ts'])
      writeFileSync('packages/vue/dist/vue.d.mts', bundle['vue.d.ts'].code)
    },
  }
}
