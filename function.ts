export function Generate2DArray (m: number, n: number, val: number = 0) {
  return [...Array(m)].map(_ => new Array(n).fill(val));
}

export function VisualizeArray (array: number[][]) {
  let mapped: string;
  array.forEach{
    for (const