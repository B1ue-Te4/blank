import { Generate2DArray } from "./function";

class field {
    entity: number[][]

    constructor() {
        this.entity = Generate2DArray(20,10)
    }
};