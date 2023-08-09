import { isInt, isPort } from '../src'

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
