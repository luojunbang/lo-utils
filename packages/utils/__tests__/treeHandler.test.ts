import { FlattenTreeDeepFirst, FlattenTreeWildFirst, list2Tree } from '../src'

describe('treeHandler', () => {
  const arr3 = [
    {
      name: 'root',
      child: [
        { name: 'p0', child: [] },
        { name: 'p1', child: [{ name: 'c1_1' }, { name: 'c1_2' }] },
        {
          name: 'p2',
          child: [
            { name: 'c2_1', child: [{ name: 'c2_1_1' }, { name: 'c2_1_2' }] },
            { name: 'c2_2' },
          ],
        },
        { name: 'p3' },
      ],
    },
  ]
  test('FlattenTreeDeepFirst', () => {
    const arr1 = []
    expect(FlattenTreeDeepFirst(arr1).join(',')).toBe('')
    const arr2 = [{ name: '1', children: [] }]
    expect(
      FlattenTreeDeepFirst(arr2, { children: 'child', id: 'name' })
        .map((i) => i.name)
        .join(','),
    ).toBe(['1'].join(','))

    expect(
      FlattenTreeDeepFirst(arr3, { children: 'child', id: 'name' }).map((i) => i.name),
    ).toEqual(['root', 'p0', 'p1', 'c1_1', 'c1_2', 'p2', 'c2_1', 'c2_1_1', 'c2_1_2', 'c2_2', 'p3'])
  })
  test('FlattenTreeWildFirst', function () {
    expect(
      FlattenTreeWildFirst(arr3, { children: 'child', id: 'name' }).map((i) => i.name),
    ).toEqual(['root', 'p0', 'p1', 'p2', 'p3', 'c1_1', 'c1_2', 'c2_1', 'c2_2', 'c2_1_1', 'c2_1_2'])
  })
  test('list2Tree', () => {
    const arr = [
      {
        id: '1',
        child: [
          { id: '1-1', pId: '1', child: [] },
          { id: '1-2', pId: '1', child: [] },
        ],
      },
      { id: '2', child: [{ id: '2-1', pId: '2', child: [] }] },
    ]
    const res = [
      { id: '1' },
      { id: '1-1', pId: '1' },
      { id: '1-2', pId: '1' },
      { id: '2' },
      { id: '2-1', pId: '2' },
    ]

    expect(list2Tree(res, { parentId: 'pId', id: 'id', children: 'child' })).toEqual(arr)
  })
})
