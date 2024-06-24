import { quene } from '../src' // 假设 quene 函数的实现在 quene.ts 文件中

describe('quene function', () => {
  test('should process items in the list with concurrency', async () => {
    const myList = [5, 2, 1, 4, 3]
    const callOrder: number[] = []
    // Mock async function for processing items using jest.fn()
    const mockProcessItem = jest.fn(async (item: number, idx: number): Promise<number> => {
      // Simulate asynchronous processing, e.g., a delay
      await new Promise((resolve) => setTimeout(resolve, item * 100))
      callOrder.push(idx)
      return item * 2 // Double the item value
    })

    const results = await quene(myList, mockProcessItem, 2)

    expect(results).toEqual([10, 4, 2, 8, 6]) // Check if results are as expected
    expect(callOrder).toEqual([1, 2, 0, 3, 4]) // Check if callOrder are as expected

    // Verify that processItem was called with each item in the list
    expect(mockProcessItem).toHaveBeenCalledTimes(myList.length)
    myList.forEach((item, index) => {
      expect(mockProcessItem).toHaveBeenCalledWith(item, index)
    })
  })

  test('should handle empty list', async () => {
    const myList: number[] = []

    // Mock async function for processing items using jest.fn()
    const mockProcessItem = jest.fn(async (item: number, idx: number): Promise<number> => {
      // This block should never be executed in this test
      return item * 2
    })

    const results = await quene(myList, mockProcessItem, 2)

    expect(results).toEqual([]) // Check if results are as expected

    // Verify that processItem was not called
    expect(mockProcessItem).not.toHaveBeenCalled()
  })

  test('should process items with thread limit of 1 (sequential processing)', async () => {
    const myList = [1, 2, 3]

    // Mock async function for processing items using jest.fn()
    const mockProcessItem = jest.fn(async (item: number, idx: number): Promise<number> => {
      // Simulate asynchronous processing, e.g., a delay
      await new Promise((resolve) => setTimeout(resolve, 100))
      return item * 2 // Double the item value
    })

    const results = await quene(myList, mockProcessItem, 1)

    expect(results).toEqual([2, 4, 6]) // Check if results are as expected

    // Verify that processItem was called with each item in the list
    expect(mockProcessItem).toHaveBeenCalledTimes(myList.length)
    myList.forEach((item, index) => {
      expect(mockProcessItem).toHaveBeenCalledWith(item, index)
    })
  })

  test('should handle a thread count larger than the list length', async () => {
    const myList = [1, 2]

    // Mock async function for processing items using jest.fn()
    const mockProcessItem = jest.fn(async (item: number, idx: number): Promise<number> => {
      // Simulate asynchronous processing, e.g., a delay
      await new Promise((resolve) => setTimeout(resolve, 100))
      return item * 2 // Double the item value
    })

    const results = await quene(myList, mockProcessItem, 5)

    expect(results).toEqual([2, 4]) // Check if results are as expected

    // Verify that processItem was called with each item in the list
    expect(mockProcessItem).toHaveBeenCalledTimes(myList.length)
    myList.forEach((item, index) => {
      expect(mockProcessItem).toHaveBeenCalledWith(item, index)
    })
  })

  test('should handle errors in the processing function', async () => {
    const myList = [1, 2, 3]

    // Mock async function for processing items using jest.fn()
    const mockProcessItem = jest.fn(async (item: number, idx: number): Promise<number> => {
      // Simulate an error for the second item
      if (item === 2) {
        throw new Error('Test error')
      }
      await new Promise((resolve) => setTimeout(resolve, 100))
      return item * 2 // Double the item value
    })

    const ret = await quene(myList, mockProcessItem, 2)

    // Verify that processItem was called with each item in the list until the error occurred
    expect(mockProcessItem).toHaveBeenCalledTimes(3)
    expect(mockProcessItem).toHaveBeenCalledWith(1, 0)
    expect(mockProcessItem).toHaveBeenCalledWith(2, 1)
    expect(mockProcessItem).toHaveBeenCalledWith(3, 2)
    expect(ret[1]).toEqual(new Error('Test error'))
  })
})
