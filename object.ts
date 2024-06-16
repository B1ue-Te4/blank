import { GenerateEntity } from "./function";

interface Block {
    origin: number[];
    move: number[];
    entity: number[][][];
    rotation: number;
    locked: boolean;
    lastmove: string;

    spin(): void;
    up(): void;
    down(): void;
    left(): void;
    right(): void;
}

export class Block_T implements Block {
    origin: number[];
    move: number[];
    entity: number[][][];
    rotation: number;
    locked: boolean;
    lastmove: string;

    constructor() {
        this.origin = [0,0];
        this.move = [0,0];
        this.entity = [[[0],[1],[0]],[[1],[1],[1]],[[0],[0],[0]]];
        this.rotation = 0;
        this.locked = false;
        this.lastmove = "new";
    }

    spin() {
        this.rotation = this.rotation + 1;
        if (this.rotation > 3) {this.rotation = 0};
        switch (this.rotation) {
            case 0:
                this.entity = [[[0],[1],[0]],[[1],[1],[1]],[[0],[0],[0]]];
                break;
            case 1:
                this.entity = [[[0],[1],[0]],[[0],[1],[1]],[[0],[1],[0]]];
                break;
            case 2:
                this.entity = [[[0],[0],[0]],[[1],[1],[1]],[[0],[1],[0]]];
                break;
            case 3:
                this.entity = [[[0],[1],[0]],[[1],[1],[0]],[[0],[1],[0]]];
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
    blockmemory: Block[];
    entity: number[][][];

    constructor() {
        this.origin = [4,0];
        this.width = 12;
        this.height = 22;
        this.blockmemory = [];

        this.entity = GenerateEntity(this.height, this.width);
        this.entity.forEach((eachRow) => {
            eachRow[0][0] = 1;
            eachRow[this.width - 1][0] = 1; 
        });
        this.entity[this.height - 1].forEach((_, colNum, lastRow) => {
            lastRow[colNum][0] = 1;
        });
    }

    fieldInitialize() {
        this.entity = GenerateEntity(this.height, this.width);
        this.entity.forEach((eachRow) => {
            eachRow[0][0] = 1;
            eachRow[this.width - 1][0] = 1; 
        });
        this.entity[this.height - 1].forEach((_, colNum, lastRow) => {
            lastRow[colNum][0] = 1;
        });
    }

    checkInterference(): boolean {
        let intf: boolean = false;
        this.entity.forEach((eachRow) => {
            eachRow.forEach((value) => {
                if (value[0] = 2){intf = true;}
            });
        });
        return intf;
    }

    cancelBlockmove() {
        const lastBlock: Block = this.blockmemory[this.blockmemory.length - 1];
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
            case "new":
                break;
        }
    }

    clearLineCheck(){
        let filledRow: number[] = [];
        this.entity.forEach((eachRow,rowNum) => {
            let lineSum: number = 0;
            eachRow.forEach((value) => {
                lineSum = lineSum + value[0];
            });
            if (lineSum > 12){filledRow.push(rowNum);}
        });
        if (filledRow.length > 0){
            filledRow.forEach((tgtRow) => {
                this.entity[tgtRow].forEach((value) => {
                    value[0] = 0;
                });
            });
        }
    }

    clearBlockCheck(){
        let notEmptyBlocksArray: Block[] = [];
        this.blockmemory.forEach((eachBlock) => {
            let isBlockEmpty: boolean = true;
            eachBlock.entity.forEach((eachRow) => {
                eachRow.forEach((value) => {
                    if(value[0] = 1){isBlockEmpty = false;}
                });
            });
            if(!isBlockEmpty){notEmptyBlocksArray.push(eachBlock);}
        });
        this.blockmemory = notEmptyBlocksArray;
    }

    loadBlock(objBlock: Block) {
        this.blockmemory.push(objBlock);
    }

    materialize() {
        this.fieldInitialize();

        this.blockmemory.forEach((block) => {
            const blockX: number = this.origin[0] + block.origin[0] + block.move[0];
            const blockY: number = this.origin[1] + block.origin[1] + block.move[1];

            block.entity.forEach((eachRow, rowNum) => {
                eachRow.forEach((blockValue, colNum) => {
                    if (blockX + rowNum > this.height) return;
                    if (blockY + colNum > this.width) return;
                    if (this.entity[blockY + rowNum][blockX + colNum][0] = 0){
                        this.entity[blockY + rowNum][blockX + colNum]= blockValue;
                    } else {
                        this.cancelBlockmove();
                    }
                });
            });
        });

        this.clearLineCheck();
        this.clearBlockCheck();
    }
}