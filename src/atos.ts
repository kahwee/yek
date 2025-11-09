/**
 * Converts an array of path segments to bracket notation string
 * 
 * @example
 * atos(['one', 'two', 'three']) // returns 'one[two][three]'
 * atos(['users', '0', 'name'])  // returns 'users[0][name]'
 * 
 * @param pathInArray - Array of path segments
 * @returns Path string in bracket notation
 * @throws Error if the input array is empty
 */
export default function atos (pathInArray: string[]): string {
  if (pathInArray.length === 0) {
    throw new Error('Input array cannot be empty')
  }

  return pathInArray.reduce((previousValue, currentValue, index) => {
    return index === 0 ? currentValue : `${previousValue}[${currentValue}]`
  })
}