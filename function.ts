export function Generate2DArray (m: number, n: number, val: number = 0) {
  return [...Array(m)].map(_ => new Array(n).fill(val));
};

export function Visualize2DArray (array2D: number[][]) {
  let mapped: string = "";

  array2D.forEach((value) => {
    value.forEach(value => {
      mapped = mapped + value
    });

    mapped = mapped + "\n";
  });

  return mapped;
};