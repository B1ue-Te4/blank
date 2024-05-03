export function Generate2DArray (m: number, n: number, val: number = 0) {
    return [...Array(m)].map(_ => Array(n).fill(val));
  }