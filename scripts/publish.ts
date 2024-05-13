import { $ } from 'execa'

import { utilsOutput } from '@lo/build-helper'

async function init() {
  const { TAG_VERSION, GIT_HEAD } = process.env
  if (!TAG_VERSION || !GIT_HEAD) {
    throw new Error('Need github action env. ')
  }
  const [pkgName, version] = TAG_VERSION.split('/')
  await $({ stdio: 'inherit' })`pnpm run -C ./packages/${pkgName} build`

  await $({ stdio: 'inherit' })`echo "✅ Build Done. ${utilsOutput}"`

  // await $({ stdio: 'inherit' })`cp ./.npmrc ${utilsOutput}/.npmrc`
  await $({ stdio: 'inherit', cwd: utilsOutput })`npm publish`

  $`echo "✅ Publish Done. "`
}

init()
