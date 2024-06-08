export function GenerateEntity (m: number, n: number): number[][][] {
    return [...Array(m)].map(_ => new Array(n).fill([0]));
}

export function Visualize2DArray (array2D: number[][]): string {
    let mapped: string = "";

    array2D.forEach((value) => {
        value.forEach(value => {
            mapped = mapped + value
        });

        mapped = mapped + "\n";
    });

    return mapped;
}