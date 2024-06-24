import type { Config } from 'jest'
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  rootDir: __dirname,
}

export default config
