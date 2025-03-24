/**
 * This changes an array:
 *  ["one", "two", "three"]
 * Into a str:
 *  one[two][three]
 * @param pathInArray - Array of path segments
 * @returns Path string in bracket notation
 */
export default function atos (pathInArray: string[]): string {
  return pathInArray.reduce((previousValue, currentValue, index) => {
    if (!index) {
      return currentValue
    } else {
      return previousValue + '[' + currentValue + ']'
    }
  })
}