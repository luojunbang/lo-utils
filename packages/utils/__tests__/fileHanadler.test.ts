import { getImageType } from '../src'

describe('', () => {
  test('debounce: call in wait', async () => {
    const target = 'png'
    expect(getImageType(`some..1.2._-s12.${target}`)).toBe(target)
    expect(getImageType(`some.A.${target}`)).toBe(target)
    expect(getImageType(`some.1.${target}`)).toBe(target)
    expect(getImageType(`some.`)).toBe('')
    // expect(getImageType(`some`)).toThrowError(`Can't get the extension from string some.`)
  })
})
