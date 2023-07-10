/**
 * 深度遍历
 * @public
 * @param root - target tree
 * @param options - default as 'children' for children key,'id' for unique key 
 */
export function deepFisrt(root: any[], { children = 'children', id = 'id' } = {}) {
  if (!Array.isArray(root)) return []
  const parseNode = (node: any) => {
    const res = [{ [id]: node[id] }]
    if (Array.isArray(node[children])) {
      node[children].forEach((n: any) => res.push(...parseNode(n)))
    }
    return res
  }
  const res: { [x: string]: any }[] = []
  root.forEach(n => res.push(...parseNode(n)))
  return res
}

/**
 * 广度遍历
 * @public
 * @param root - target tree
 * @param options - default as 'children' for children key,'id' for unique key 
 */
export function wildFirst(root: any[], { children = 'children', id = 'id' } = {}) {
  let waitParseList = []
  const res = root.map((node: any) => {
    Array.isArray(node[children]) && waitParseList.push(...node[children])
    return { [id]: node[id] }
  })
  while (waitParseList.length != 0) {
    const cacheList: any[] = []
    waitParseList.forEach(node => {
      res.push({ [id]: node[id] })
      Array.isArray(node[children]) && cacheList.push(...node[children])
    })
    waitParseList = cacheList
  }
  return res
}

/**
 * 深度优先
 * @public
 * @param root - target Tree
 * @param fn - callback
 * @param options - default as 'children' for children key,'id' for unique key 
 */
export function deepPriority<T extends Record<string, any>, U>(root: T, fn: (x: T, y: number) => any, { children = 'children' } = {}): void {
  if (Array.isArray(root[children]) && root[children].length > 0) {
    ;(root[children] as T[]).forEach((node, idx) => {
      fn(node, idx)
      deepPriority(node, fn)
    })
  }
}


interface TreeNode extends Record<string, any> {}
interface Tree extends TreeNode {
  children: TreeNode[]
}

/**
 * 列表转换为树结构
 * @beta
 * @param list - list
 * @param options - default as 'children' form children key
 */
export function list2Tree(list: TreeNode[], { id = 'id', parentId = 'parentId' } = {}): Tree[] {
  const res: Tree[] = []
  const obj: Record<string, Tree> = {}
  list.forEach((i: TreeNode) => {
    const _parentId = i[parentId]
    const _id = i[id]
    if (obj[_id] && obj[_id][id]) throw new Error('REPEAT ID..')
    obj[_id] = { ...i, children: obj[_id] ? obj[_id].children : [] }
    if (!obj[_parentId]) obj[_parentId] = { children: [] as TreeNode[] }
    obj[_parentId].children.push(obj[_id])
  })
  Object.keys(obj).forEach(key => {
    const item: Tree = obj[key]
    if (obj[item.parentId] && !obj[item.parentId].id) {
      res.push(item)
    }
  })
  return res
}


/**
 * 树结构转换为列表
 * @alpha
 * @param list - list
 */
export function tree2List(list:any[]){

}