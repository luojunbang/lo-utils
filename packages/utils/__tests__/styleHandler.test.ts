import { parseToPx } from '../src'

describe('styleHandler', function () {
  test('parseToPx', function () {
    expect(parseToPx(0)).toBe('0')
    expect(parseToPx('0')).toBe('0')
    expect(parseToPx('12')).toBe('12px')
    expect(parseToPx('12%')).toBe('12%')
    expect(parseToPx('12vw')).toBe('12vw')
    expect(parseToPx('12vh')).toBe('12vh')
    expect(parseToPx('12em')).toBe('12em')
    expect(parseToPx('12rem')).toBe('12rem')
  })
})
