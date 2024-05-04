import { validateLocaleAndSetLanguage } from "typescript";

export function Generate2DArray (m: number, n: number, val: number = 0) {
  return [...Array(m)].map(_ => new Array(n).fill(val));
};

export function VisualizeArray (array: number[][]) {
  let mapped: string = "";

  array.forEach((value,index) => {
    value.forEach(value => {
      mapped = mapped + value
    });

    mapped = mapped + "\n";
  });

  return mapped;
};

console.log(VisualizeArray(Generate2DArray(4,2,1)))