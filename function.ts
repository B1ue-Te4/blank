export function GenerateEntity (m: number, n: number, val = ' '): string[][][] {
    return Array.from(new Array(m), _ => new Array(n).fill(new Array(1).fill(val)));
}

export function VisualizeEntity (entity: string[][][]): string {
    let mapped: string = "";

    entity.forEach((eachRow) => {
        eachRow.forEach(value => {
            mapped = mapped + value[0];
        });

        mapped = mapped + "\n";
    });

    return mapped;
}