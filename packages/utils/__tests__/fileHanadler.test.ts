import { getExt } from '../src'

describe('', () => {
  test('getExt', async () => {
    const target = 'png'
    expect(getExt(`some..1.2._-s12.${target}`)).toBe(target)
    expect(getExt(`some.A.${target}`)).toBe(target)
    expect(getExt(`some.1.${target}`)).toBe(target)
    expect(getExt(`some.`)).toBe('')
    expect(getExt(`some`)).toBeNull()
  })
})
