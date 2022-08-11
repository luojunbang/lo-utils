import { isInt } from '../src'

describe('validator', function () {
  test('isInt', function () {
    expect(isInt(0)).toBe(true)
    expect(isInt(1)).toBe(true)
    expect(isInt('01')).toBe(false)
    expect(isInt('l')).toBe(false)
  })
})