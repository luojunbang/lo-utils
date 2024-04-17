import { pick, exclude }

 from '../src/objectHandler'

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

describe('exclude', () => {
  test('exclude zero field', () => {
    expect(exclude(obj, [])).toEqual(obj)
  })
  test('exclude some fields', () => {
    expect(exclude(obj, ['foo'])).toEqual({ hel, bar })
    expect(exclude(obj, ['foo', 'bar'])).toEqual({ hel })
  })
  test('exclude all fields', () => {
    expect(exclude(obj, Object.keys(obj) as KeysOfTypeMyObj[])).toEqual({})
  })
})
