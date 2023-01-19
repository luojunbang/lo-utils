// 树遍历

/**
 * @description
 * 深度遍历
 * @param {Array} arr
 * @returns {Array}
 */

interface tree {
  [x: string]: any
}

export function deepFisrt(arr: any[], { children = 'children', name = 'name' } = {}) {
  if (!Array.isArray(arr)) return []
  const parseNode = (node: any) => {
    const res = [{ [name]: node[name] }]
    if (Array.isArray(node[children])) {
      node[children].forEach((n: any) => res.push(...parseNode(n)))
    }
    return res
  }
  const res: { [x: string]: any }[] = []
  arr.forEach(n => res.push(...parseNode(n)))
  return res
}

/**
 * @description
 * 广度遍历
 * @param {Array} arr
 * @returns {Array}
 */
export function wildFirst(arr: any[], { children = 'children', name = 'name' } = {}) {
  let waitParseList = []
  const res = arr.map((node: any) => {
    Array.isArray(node.children) && waitParseList.push(...node.children)
    return { [name]: node[name] }
  })
  while (waitParseList.length != 0) {
    const cacheList: any[] = []
    waitParseList.forEach(node => {
      res.push({ [name]: node[name] })
      Array.isArray(node.children) && cacheList.push(...node.children)
    })
    waitParseList = cacheList
  }
  return res
}

export function deepPriority<T extends Record<string, any>, U>(root: T, fn: (x: T, y: number) => any, { children = 'children' } = {}): void {
  if (Array.isArray(root[children]) && root[children].length > 0) {
    ;(root[children] as T[]).forEach((node, idx) => {
      fn(node, idx)
      deepPriority(node, fn)
    })
  }
}

enum TreeKey {
  ID,
  PARENTID,
}

interface TreeNode extends Record<string, any> {}
interface Tree extends TreeNode {
  children: TreeNode[]
}

export function list2Tree(list: TreeNode[], { id = 'id', pId = 'pId' } = {}): Tree[] {
  const res: Tree[] = []
  const obj: Record<string, Tree> = {}
  list.forEach((i: TreeNode) => {
    const _parentId = i[pId]
    const _id = i[id]
    if (obj[_id] && obj[_id][id]) throw new Error('REPEAT ID..')
    obj[_id] = { ...i, children: obj[_id] ? obj[_id].children : [] }
    if (!obj[_parentId]) obj[_parentId] = { children: [] as TreeNode[] }
    obj[_parentId].children.push(obj[_id])
  })
  Object.keys(obj).forEach(key => {
    const item: Tree = obj[key]
    if (obj[item.pId] && !obj[item.pId].id) {
      res.push(item)
    }
  })
  return res
}
