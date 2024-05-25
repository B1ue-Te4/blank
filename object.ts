import { Generate2DArray } from "./function";

interface Block {
    origin: number[];
    move: number[];
    entity: number[][];
    rotation: number;
    locked: boolean;
    lastmove: string;

    spin(): void;
    up():void;
    down(): void;
    left(): void;
    right(): void;
}

export class Block_T implements Block {
    origin: number[];
    move: number[];
    entity: number[][];
    rotation: number;
    locked: boolean;
    lastmove: string;

    constructor() {
        this.origin = [0,0];
        this.move = [0,0];
        this.entity = [[0,1,0],[1,1,1],[0,0,0]];
        this.rotation = 0;
        this.locked = false;
        this.lastmove = "";
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
        }
    }

    up() {
        this.move[1] = this.move[1] - 1;
        this.lastmove = "up";
    }
    down() {
        this.move[1] = this.move[1] + 1;
        this.lastmove = "down";
    }
    left() {
        this.move[0] = this.move[0] - 1;
        this.lastmove = "left";
    }
    right() {
        this.move[0] = this.move[0] + 1;
        this.lastmove = "right";
    }
}

export class Field {
    origin: number[];
    width: number;
    height: number;
    loadspace: Block[];
    entity: number[][];

    constructor() {
        this.origin = [4,0];
        this.width = 12;
        this.height = 22;
        this.loadspace = [];

        this.entity = Generate2DArray(this.height,this.width);
        this.entity.forEach((eachRow) => {
            eachRow[0] = 1;
            eachRow[this.width - 1] = 1; 
        });
        this.entity[0].forEach((_, colNum, firstRow) => {
            firstRow[colNum] = 1 
        });
        this.entity[this.height - 1].forEach((_, colNum, lastRow) => {
            lastRow[colNum] = 1 
        });
    }

    fieldInitialize() {
        this.entity = Generate2DArray(this.height,this.width);
        this.entity.forEach((eachRow) => {
            eachRow[0] = 1;
            eachRow[this.width - 1] = 1; 
        });
        this.entity[0].forEach((_, colNum, firstRow) => {
            firstRow[colNum] = 1 
        });
        this.entity[this.height - 1].forEach((_, colNum, lastRow) => {
            lastRow[colNum] = 1 
        });
    }

    checkInterfarence(): boolean {
        let intf: boolean = false;
        this.entity.forEach((eachRow) => {
            if (eachRow.includes(2)){intf = true}
        });
        return intf;
    }

    checkBlockmove() {
        if (this.checkInterfarence()){
            const lastBlock: Block = this.loadspace[this.loadspace.length];
            switch (lastBlock.lastmove) {
                case "up":
                    lastBlock.down();
                    break;
                case "down":
                    lastBlock.up();
                    lastBlock.locked = true;
                    break;
                case "left":
                    lastBlock.right();
                    break;
                case "right":
                    lastBlock.left();
                    break;
            }
        }
    }

    loadBlock(objBlock: Block) {
        this.loadspace.push(objBlock);
    }

    materialize() {
        this.fieldInitialize()
        
        this.loadspace.forEach((block) => {
            const x: number = this.origin[0] + block.origin[0] + block.move[0];
            const y: number = this.origin[1] + block.origin[1] + block.move[1];

            block.entity.forEach((eachRow, rowNum) => {
                eachRow.forEach((blockValue, colNum) => {
                    const fieldValue = this.entity[y + rowNum][x + colNum];
                    this.entity[y + rowNum][x + colNum] = fieldValue + blockValue;
                });
            });
        });

        this.checkBlockmove();
    }
}