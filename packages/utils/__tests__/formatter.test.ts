import { fmtStorageSize, fmtContentLength, fmtNum } from '../src'
describe('Utils', function () {
  test('fmtStorageSize', function () {
    expect(fmtStorageSize('2048', 'k')).toBe('2k')
    expect(fmtStorageSize(2048, 'kb')).toBe('2kb')
    expect(fmtStorageSize(2048)).toBe('2k')
    expect(fmtStorageSize(2048, 'Kb')).toBe('2Kb')
    expect(fmtStorageSize('2048K', 'm')).toBe('2m')
    expect(fmtStorageSize('2.5m', 'k')).toBe('2560k')
    expect(fmtStorageSize('10.5m', 'b')).toBe('11010048b')
    expect(fmtStorageSize('10.5m')).toBe('10.5m')
    expect(fmtStorageSize('2048K', 'mb')).toBe('2mb')
    expect(fmtStorageSize('2048K', 'MB')).toBe('2MB')
    expect(fmtStorageSize('2048K', 'k')).toBe('2048k')
    expect(fmtStorageSize('2048K', 'g')).toBe('0.0g')
    expect(fmtStorageSize('200K', 'm')).toBe('0.2m')
  })
  test('fmtContentLength', function () {
    expect(fmtContentLength(1000)).toBe('1K')
    expect(fmtContentLength(2100)).toBe('2.1K')
  })
})

describe('fmtNum function', () => {
  test('format with currency symbol', () => {
    expect(fmtNum('1234567.89', 2, '¥')).toBe('¥1,234,567.89')
    expect(fmtNum('-1234567.89', 2, '€')).toBe('€-1,234,567.89')
  })

  test('format without currency symbol', () => {
    expect(fmtNum('9876543.21', 2)).toBe('9,876,543.21')
  })

  test('format number as string', () => {
    expect(fmtNum('1234567.89', 2)).toBe('1,234,567.89')
  })

  test('format negative number with currency symbol', () => {
    expect(fmtNum('-9876543.21', 2, '¥')).toBe('¥-9,876,543.21')
  })

  test('invalid number', () => {
    expect(fmtNum('invalid', 2)).toBe('Invalid number')
  })

  test('format with decimal places with currency symbol', () => {
    expect(fmtNum(1234567.89, 2, '$')).toBe('$1,234,567.89')
  })

  test('format with decimal places', () => {
    expect(fmtNum(1234567.89, 2)).toBe('1,234,567.89')
  })

  test('format with zero decimal places with currency symbol', () => {
    expect(fmtNum(1234567.89, 0, '$')).toBe('$1,234,568')
  })

  test('format with NaN', () => {
    expect(fmtNum(NaN, 2)).toBe('Invalid number')
  })

  test('format with negative number and zero decimal places with currency symbol', () => {
    expect(fmtNum(-1234567.89, 0, '$')).toBe('$-1,234,568')
  })

  test('format with negative number and decimal places with currency symbol', () => {
    expect(fmtNum(-1234567.89, 2, '$')).toBe('$-1,234,567.89')
  })
})
