/**
 * Converts a bracket notation string to an array of path segments
 *
 * @example
 * stoa('one[two][three]') // returns ['one', 'two', 'three']
 * stoa('users[0][name]')  // returns ['users', '0', 'name']
 * stoa('singleItem')      // returns ['singleItem']
 * stoa('')                // returns []
 *
 * Splits on either bracket and discards empty segments. Malformed notation
 * is accepted; brackets within keys cannot be escaped.
 *
 * @param pathInStr - Path string in bracket notation
 * @returns Array of path segments
 */
export default function stoa(pathInStr: string): string[] {
  if (!pathInStr) {
    return []
  }

  return pathInStr.split(/[[\]]+/).filter(Boolean)
}
