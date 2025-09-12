/**
 * Toggles an item in an array:
 * - If the item exists, it is removed.
 * - If the item does not exist, it is added.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} list - The array to modify.
 * @param {T} key - The item to toggle.
 * @returns {[T[], boolean]} - A tuple containing the updated array and a boolean indicating if the item was added (`true`) or removed (`false`).
 */
export function arrayToggleItem<T>(list: T[], key: T): [T[], boolean] {
  // 查找 key 在 list 中的位置
  const index = list.indexOf(key)
  const added = index === -1

  if (added) {
    // key 不在 list 中，添加它
    list.push(key)
  } else {
    // key 已存在，移除它
    list.splice(index, 1)
  }

  // 返回更新后的列表和布尔值，表示是否添加了 key
  return [list, added]
}
