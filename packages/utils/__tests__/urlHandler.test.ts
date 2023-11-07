import { parseParams, getParams } from '../src'

describe('urlHandler', () => {
  test('parseParams', () => {
    const params = {
      n: 1,
      s: 'string',
      un: undefined,
      nu: null,
    }
    const query = 'n=1&s=string&un=&nu='
    expect(parseParams(params)).toBe(query)
  })

  test('getParams', () => {
    const params = {
      n: '1',
      s: 'string',
      un: 'undefined',
      nu: 'null',
    }
    const query = 'n=1&s=string&un=undefined&nu=null'
    expect(getParams(query)).toEqual(params)
  })
})
