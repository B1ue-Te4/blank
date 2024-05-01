let generate2DArray1 = (m: number, n: number, val = 0) => {
    return Array.from(new Array(m), _ => new Array(n).fill(val));
  };


let generate2DArray2 = (m: any, n: any, val = 0) => {
    return [...Array(m)].map(_ => Array(n).fill(val));
  }

let spreadtest = (m: any, n: any, val = 0) => {
    return Array(m).map((_, index) => index);
  }

let arrts: number[] = [...Array(5)].map((_, index) => index);

let arrts2: number[] = new Array(5);

console.log(arrts2)

console.log([...arrts2])

arrts2 = arrts2.map((_, index) => index);

console.log(arrts2)