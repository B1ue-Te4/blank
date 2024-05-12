import { Generate2DArray } from "./function";

interface Block {
    origin: number[];
    entity: number[][];
    x: number;
    y: number;
    rotation: number;

    spin(): void;
    down(): void;
    left(): void;
    right(): void;
}

export class Block_T implements Block {
    origin: number[];
    entity: number[][];
    x: number;
    y: number;
    rotation: number;

    constructor(){
        this.origin = [0,0];
        this.entity =[[0,1,0],[1,1,1],[0,0,0]];
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    }

    spin() {
        this.rotation = this.rotation + 1;
        if (this.rotation > 3) {this.rotation = 0};
        switch (this.rotation) {
            case 0:
                this.entity = [[0,1,0],[1,1,1],[0,0,0]];
                break;
            case 1:
                this.entity = [[0,1,0],[0,1,1],[0,1,0]];
                break;
            case 2:
                this.entity = [[0,0,0],[1,1,1],[0,1,0]];
                break;
            case 3:
                this.entity = [[0,1,0],[1,1,0],[0,1,0]];
                break;
        };
    };

    down() {this.y = this.y - 1};
    left() {this.x = this.x - 1};
    right() {this.x = this.x + 1};
};

export class field {
    origin: number[];
    entity: number[][];

    constructor() {
        this.origin = [0,4];
        this.entity = Generate2DArray(20,10);
    };

    loadBlock(objBlock: Block){
        const originX: number = objBlock.origin[0] + objBlock.x;
        const originY: number = objBlock.origin[1] + objBlock.y;
        this.entity[originX][originY] = 666
    };
};