/**
 * 深度遍历扁平化
 * @public
 * @param root - target tree
 * @param fields - default as 'children' for children key,'id' for unique key
 */
export function FlattenTreeDeepFirst<T>(root: T[], fields?: { children?: keyof T }) {
  const res: T[] = []
  deepPriority<T>(
    root,
    (item) => {
      res.push(item)
      return false
    },
    fields,
  )
  return res
}
/**
 * 深度遍历
 * @public
 * @param root - target tree
 * @param fields - default as 'children' for children key,'id' for unique key
 */
export function FlattenTreeWildFirst<T extends Record<string, any>>(root: T[], fields?: { children?: string }) {
  const res: T[] = []
  wildPriority(
    root,
    (item) => {
      res.push(item)
    },
    fields,
  )
  return res
}

/**
 * 广度优先遍历
 * @public
 * @param root - target tree
 * @param fn - callback if return truely, it break
 * @param fields - default as 'children' for children key,'id' for unique key
 */
export function wildPriority<T extends Record<string, any>>(root: T[], fn: (item: T) => any, fields?: { children?: string }) {
  const { children = 'children' } = fields ?? {}
  const waitParseList = [...root]
  while (waitParseList.length > 0) {
    const item = waitParseList.shift()
    if (!item) break
    if (fn(item)) break
    if (item[children]?.length > 0) waitParseList.push(...item[children])
  }
}

/**
 * 深度优先遍历
 * @public
 * @param root - target Tree
 * @param fn - callback if return truely, it break
 * @param fields - default as 'children' for children key,'id' for unique key
 */
function deepPriority<T>(root: T[], fn: (item: T, index: number, level: number) => boolean | undefined, fields?: { children?: keyof T }) {
  const { children = 'children' } = fields ?? {}
  const _level = 0
  function deep(nodes, fn, level: number) {
    for (let i = 0; i < nodes.length; i++) {
      const item = nodes[i]
      if (fn(item, i, level)) break
      if (item[children]?.length > 0) {
        deep(item[children], fn, level + 1)
      }
    }
  }

  deep(root, fn, _level)
}

/**
 * 列表转换为树结构
 * @beta
 * @param list - list
 * @param fields - default as children = 'children' , id = 'id', parentId = 'parentId', orderCallback, callback: (item,index)=>
 */
export function list2Tree<T extends Record<string, any>>(
  list: T[],
  fields?: { children?: string; id?: string; parentId?: string; orderCallback?: (a: T, b: T) => number; callback?: (T, number) => T },
): T[] {
  const { children = 'children', id = 'id', parentId = 'parentId', orderCallback, callback } = fields ?? {}

  const res: T[] = []
  const cachedMap: Record<string, T> = {}
  list.forEach((_item, index) => {
    const item = callback ? callback(_item, index) : _item
    const _parentId = item[parentId]
    const _id = item[id]
    if (cachedMap[_id] && cachedMap[_id][id]) throw new Error('REPEAT ID..')

    cachedMap[_id] = { ...item, [children]: cachedMap[_id] ? cachedMap[_id][children] : [] }
    if (_parentId === undefined) return
    if (!cachedMap[_parentId]) cachedMap[_parentId] = { [children]: [] as T[] } as T

    cachedMap[_parentId][children].push(cachedMap[_id])
  })
  Object.values(cachedMap).forEach((item) => {
    if (item[id] === undefined) return
    if (item[parentId] === undefined || (cachedMap[item[parentId]] && !cachedMap[item[parentId]][id])) {
      res.push(item)
    }
  })

  if (orderCallback) {
    const loop = (list: T[]) => {
      list.sort(orderCallback)
      list.forEach((i) => i.children && loop(i.children))
    }
    loop(res)
  }
  return res
}
