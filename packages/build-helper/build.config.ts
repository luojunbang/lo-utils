import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  stub: true,
  stubOptions: {
    jiti: {
      interopDefault: true,
      cache: false,
      debug: true,
      esmResolve: true,
    },
  },
})
