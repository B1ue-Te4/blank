import { Generate2DArray } from "./function";
import { Block_T } from "./block";

class field {
    entity: number[][]

    constructor() {
        this.entity = Generate2DArray(20,10)
    }
}

let fld = new field

console.log(fld.entity)