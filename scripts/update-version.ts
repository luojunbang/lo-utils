import { $ } from 'execa'

console.log('update version start:')

async function getBranch() {
  const branch = await $`git rev-parse --abbrev-ref HEAD`
  console.log('branch:', branch)
  return
}

async function init() {
  await getBranch()
  process.exit(1)
}

init()
