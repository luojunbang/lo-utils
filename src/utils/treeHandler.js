// 树遍历

/**
 * @description
 * 深度遍历
 * @param {Array} arr
 * @returns {Array}
 */
export function deepFisrt(arr, { children = 'children', name = 'name' } = {}) {
  if (!Array.isArray(arr)) return
  const parseNode = node => {
    const res = [{ [name]: node[name] }]
    if (Array.isArray(node[children])) {
      node[children].forEach(n => res.push(...parseNode(n)))
    }
    return res
  }
  const res = []
  arr.forEach(n => res.push(...parseNode(n)))
  return res
}

/**
 * @description
 * 广度遍历
 * @param {Array} arr
 * @returns {Array}
 */
export function wildFirst(arr, { children = 'children', name = 'name' } = {}) {
  let waitParseList = []
  const res = arr.map(node => {
    Array.isArray(node.children) && waitParseList.push(...node.children)
    return { [name]: node[name] }
  })
  while (waitParseList.length != 0) {
    let cacheList = []
    waitParseList.forEach(node => {
      res.push({ [name]: node[name] })
      Array.isArray(node.children) && cacheList.push(...node.children)
    })
    waitParseList = cacheList
  }
  console.log(res)
  return res
}
