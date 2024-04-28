import { loUtilsOutput } from '@lo/build-helper'
import { execa, $ } from 'execa'

console.log('loUtilsOutput:', loUtilsOutput)

const cleanDist = async () => {
  const { stdout } = await $`pnpm -v`
  console.log('stdout:', stdout)
}

cleanDist()
