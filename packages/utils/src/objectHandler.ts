/**
 * pick some fields and return a new object
 * @param obj 
 * @param keys 
 * @returns 
 */
export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return Object.fromEntries(keys.map((k) => [k, obj[k]]))  as Pick<T, K>
}

/**
 * exclude some fields and return a new object
 * @param obj 
 * @param keys 
 * @returns 
 */
export const exclude = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  return Object.fromEntries(
    Object.keys(obj)
      .filter((k) => !keys.includes(k as K))
      .map((k) => [k, obj[k]]),
  ) as  Omit<T, K>
}
