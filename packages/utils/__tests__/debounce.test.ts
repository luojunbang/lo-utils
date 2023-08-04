import { debounce } from '../src'

describe('', () => {
  test('debounce: call in wait', async () => {
    const fn = jest.fn((rs) => rs())
    const callFn = debounce((_rs) => {
      fn(_rs)
    }, 100)
    await new Promise((rs) => {
      callFn(rs)
      callFn(rs)
      callFn(rs)
    }).then((res) => {
      expect(fn).toBeCalledTimes(1)
    })
  })
  test('debounce: call outof wait', async () => {
    const fn = jest.fn((rs) => rs())
    const callFn = debounce((_rs) => {
      fn(_rs)
    }, 300)
    await new Promise((rs) => {
      setTimeout(() => {
        callFn(rs)
      }, 500)
    })
      .then(
        () =>
          new Promise((rs) => {
            setTimeout(() => {
              callFn(rs)
            }, 500)
          }),
      )
      .then((_) => {
        expect(fn).toBeCalledTimes(2)
      })
  })
})
