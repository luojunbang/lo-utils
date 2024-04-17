import { isDef, isEmpty, isInt, isJSType, isNil, isNotEmptyText, isPercent, isPort } from '../src'

describe('isPort function', () => {
  test('valid numeric port', () => {
    expect(isPort(80)).toBe(true)
    expect(isPort(8080)).toBe(true)
  })

  test('valid string port', () => {
    expect(isPort('80')).toBe(true)
    expect(isPort('8080')).toBe(true)
  })

  test('invalid port', () => {
    expect(isPort(-1)).toBe(false)
    expect(isPort(70000)).toBe(false)
    expect(isPort('abc')).toBe(false)
    expect(isPort('123abc')).toBe(false)
    expect(isPort('')).toBe(false)
  })
})

describe('isInt function', () => {
  test('positive integer', () => {
    expect(isInt(123)).toBe(true)
    expect(isInt('456')).toBe(true)
  })

  test('negative integer', () => {
    expect(isInt(-123)).toBe(false)
    expect(isInt('-456')).toBe(false)
  })

  test('floating point number', () => {
    expect(isInt(123.45)).toBe(false)
    expect(isInt('123.45')).toBe(false)
  })

  test('zero', () => {
    expect(isInt(0)).toBe(true)
    expect(isInt('0')).toBe(true)
  })

  test('non-numeric input', () => {
    expect(isInt('abc')).toBe(false)
    expect(isInt('')).toBe(false)
    expect(isInt(null)).toBe(false)
    expect(isInt(undefined)).toBe(false)
  })
})

describe('isInt', () => {
  test('valid integer', () => {
    expect(isInt(123)).toBe(true)
    expect(isInt('456')).toBe(true)
  })

  test('invalid integer', () => {
    expect(isInt(-123)).toBe(false)
    expect(isInt('abc')).toBe(false)
  })
})

describe('isPercent', () => {
  test('valid percent', () => {
    expect(isPercent(50)).toBe(true)
    expect(isPercent('25.5')).toBe(true)
    expect(isPercent('100')).toBe(true)
  })

  test('invalid percent', () => {
    expect(isPercent(-10)).toBe(false)
    expect(isPercent('abc')).toBe(false)
    expect(isPercent(150)).toBe(false)
  })
})

describe('isPort', () => {
  test('valid port', () => {
    expect(isPort(80)).toBe(true)
    expect(isPort('8080')).toBe(true)
  })

  test('invalid port', () => {
    expect(isPort(-1)).toBe(false)
    expect(isPort('abc')).toBe(false)
    expect(isPort(65536)).toBe(false)
  })
})

describe('isJSType', () => {
  test('valid JS type', () => {
    expect(isJSType(123, 'number')).toBe(true)
    expect(isJSType('abc', 'string')).toBe(true)
    expect(isJSType([], 'array')).toBe(true)
  })

  test('invalid JS type', () => {
    expect(isJSType({}, 'array')).toBe(false)
    expect(isJSType(123, 'string')).toBe(false)
  })
})

describe('isEmpty', () => {
  test('empty value', () => {
    expect(isEmpty('')).toBe(true)
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
  })

  test('non-empty value', () => {
    expect(isEmpty('abc')).toBe(false)
    expect(isEmpty(123)).toBe(false)
  })
})

describe('isNotEmptyText', () => {
  test('non-empty text', () => {
    expect(isNotEmptyText('abc')).toBe(true)
    expect(isNotEmptyText(123)).toBe(true)
  })

  test('empty text', () => {
    expect(isNotEmptyText('')).toBe(false)
    expect(isNotEmptyText(null)).toBe(false)
    expect(isNotEmptyText(undefined)).toBe(false)
  })
})

describe('isNil', () => {
  test('nil value', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
  })

  test('non-nil value', () => {
    expect(isNil('abc')).toBe(false)
    expect(isNil(123)).toBe(false)
  })
})

describe('isDef', () => {
  test('defined value', () => {
    expect(isDef('abc')).toBe(true)
    expect(isDef(123)).toBe(true)
  })

  test('undefined value', () => {
    expect(isDef(null)).toBe(false)
    expect(isDef(undefined)).toBe(false)
  })
})
