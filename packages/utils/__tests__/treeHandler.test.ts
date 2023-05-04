import { deepFisrt, wildFirst } from '../src'
describe('treeHandler', function () {
  const arr3 = [
    {
      name: 'root',
      children: [{ name: 'p0', children: [] }, { name: 'p1', children: [{ name: 'c1_1' }, { name: 'c1_2' }] }, { name: 'p2', children: [{ name: 'c2_1', children: [{ name: 'c2_1_1' }, { name: 'c2_1_2' }] }, { name: 'c2_2' }] }, { name: 'p3' }],
    },
  ]
  test('deepFisrt', function () {
    const arr1:any[] = []
    expect(deepFisrt(arr1).join(',')).toBe('')
    const arr2 = [{ name: '1', children: [] }]
    expect(
      deepFisrt(arr2)
        .map(i => i.name)
        .join(',')
    ).toBe(['1'].join(','))

    expect(
      deepFisrt(arr3)
        .map(i => i.name)
        .join(',')
    ).toBe(['root', 'p0', 'p1', 'c1_1', 'c1_2', 'p2', 'c2_1', 'c2_1_1', 'c2_1_2', 'c2_2', 'p3'].join(','))
  })
  test('wildFirst', function () {
    expect(
      wildFirst(arr3)
        .map(i => i.name)
        .join(',')
    ).toBe(['root', 'p0', 'p1', 'p2', 'p3', 'c1_1', 'c1_2', 'c2_1', 'c2_2', 'c2_1_1', 'c2_1_2'].join(','))
  })
})