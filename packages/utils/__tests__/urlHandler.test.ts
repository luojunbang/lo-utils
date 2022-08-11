import { parseParams, getParams } from '../src'

describe('urlHandler', function () {
  test('urlHandler', function () {
    const url_str_1 = parseParams({
      a: 1,
      key: '真的',
    })
    expect(parseParams(getParams(url_str_1))).toBe(url_str_1)
    const url_str_2 = parseParams({
      a: 1,
      key: 'o',
    })
    expect(parseParams(getParams(url_str_2))).toBe(url_str_2)
    const url_str_3 = parseParams({
      a: 1,
      key: '//',
    })
    expect(parseParams(getParams(url_str_3))).toBe(url_str_3)
    const url_str_4 = parseParams({
      a: 1,
      key: undefined,
    })
  })
})