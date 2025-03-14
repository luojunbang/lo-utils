import { pick, omit } from '../src/objectHandler'

const foo = 'foo'
const bar = 'bar'
const hel = 'hel'

const obj = {
  foo,
  bar,
  hel,
}
type KeysOfTypeMyObj = keyof typeof obj

describe('pick', () => {
  test('pick zero field', () => {
    expect(pick(obj, [])).toEqual({})
  })
  test('pick some fields', () => {
    expect(pick(obj, ['foo'])).toEqual({ foo })
    expect(pick(obj, ['foo', 'bar'])).toEqual({ foo, bar })
  })
  test('pick all fields', () => {
    expect(pick(obj, Object.keys(obj) as KeysOfTypeMyObj[])).toEqual(obj)
  })
})

describe('omit', () => {
  test('omit zero field', () => {
    expect(omit(obj, [])).toEqual(obj)
  })
  test('omit some fields', () => {
    expect(omit(obj, ['foo'])).toEqual({ hel, bar })
    expect(omit(obj, ['foo', 'bar'])).toEqual({ hel })
  })
  test('omit all fields', () => {
    expect(omit(obj, Object.keys(obj) as KeysOfTypeMyObj[])).toEqual({})
  })
})
