import { Generate2DArray } from "./function";

interface Block {
    origin: number[];
    move: number[];
    entity: number[][];
    rotation: number;

    spin(): void;
    down(): void;
    left(): void;
    right(): void;
}

export class Block_T implements Block {
    origin: number[];
    move: number[];
    entity: number[][];
    rotation: number;

    constructor(){
        this.origin = [0,0];
        this.move = [0,0];
        this.entity =[[0,1,0],[1,1,1],[0,0,0]];
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

    down() {this.move[1] = this.move[1] + 1};
    left() {this.move[0] = this.move[0] - 1};
    right() {this.move[0] = this.move[0] + 1};
};

export class Field {
    origin: number[];
    width: number;
    height: number;
    entity: number[][];

    constructor() {
        this.origin = [0,4];
        this.width = 10;
        this.height = 20;
        this.entity = Generate2DArray(this.height,this.width);
    };

    loadBlock(objBlock: Block){
        if(objBlock.origin[0] + objBlock.move[0] < 0){objBlock.move[0] = 0};
        if(objBlock.origin[0] + objBlock.move[0] > this.width){objBlock.move[0] = this.width - 1};
        const X: number = objBlock.origin[0] + objBlock.move[0];

        if(objBlock.origin[1] + objBlock.move[1] < 0){objBlock.move[1] = 0};
        if(objBlock.origin[1] + objBlock.move[1] > this.height){objBlock.move[1] = this.height - 1};
        const Y: number = objBlock.origin[1] + objBlock.move[1];

        this.entity = Generate2DArray(this.height,this.width);
        this.entity[Y][X] = 6;
    };
};