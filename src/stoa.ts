/**
 * This changes a str:
 *  one[two][three]
 * Into an array:
 *  ["one", "two", "three"]
 * @param pathInStr - Path string in bracket notation
 * @returns Array of path segments
 */
export default function stoa (pathInStr: string): string[] {
  return pathInStr.split(/[[\]]+/).filter(segment => segment)
}