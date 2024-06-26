import { GenerateEntity } from './functions';
import { CHARS } from './consts';

interface Block {
    origin: number[];
    move: number[];
    entity: string[][][];
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
    entity: string[][][];
    rotation: number;
    locked: boolean;
    lastmove: string;

    constructor() {
        this.origin = [0,0];
        this.move = [0,0];
        this.entity = [[[CHARS.FIELD],[CHARS.BLOCK],[CHARS.FIELD]],[[CHARS.BLOCK],[CHARS.BLOCK],[CHARS.BLOCK]],[[CHARS.FIELD],[CHARS.FIELD],[CHARS.FIELD]]];
        this.rotation = 0;
        this.locked = false;
        this.lastmove = 'new';
    }

    spin() {
        this.rotation = this.rotation + 1;
        if (this.rotation > 3) {this.rotation = 0};
        switch (this.rotation) {
            case 0:
                this.entity = [[[CHARS.FIELD],[CHARS.BLOCK],[CHARS.FIELD]],[[CHARS.BLOCK],[CHARS.BLOCK],[CHARS.BLOCK]],[[CHARS.FIELD],[CHARS.FIELD],[CHARS.FIELD]]];
                break;
            case 1:
                this.entity = [[[CHARS.FIELD],[CHARS.BLOCK],[CHARS.FIELD]],[[CHARS.FIELD],[CHARS.BLOCK],[CHARS.BLOCK]],[[CHARS.FIELD],[CHARS.BLOCK],[CHARS.FIELD]]];
                break;
            case 2:
                this.entity = [[[CHARS.FIELD],[CHARS.FIELD],[CHARS.FIELD]],[[CHARS.BLOCK],[CHARS.BLOCK],[CHARS.BLOCK]],[[CHARS.FIELD],[CHARS.BLOCK],[CHARS.FIELD]]];
                break;
            case 3:
                this.entity = [[[CHARS.FIELD],[CHARS.BLOCK],[CHARS.FIELD]],[[CHARS.BLOCK],[CHARS.BLOCK],[CHARS.FIELD]],[[CHARS.FIELD],[CHARS.BLOCK],[CHARS.FIELD]]];
                break;
        }
    }

    up() {
        this.move[1] = this.move[1] - 1;
        this.lastmove = 'up';
    }
    down() {
        this.move[1] = this.move[1] + 1;
        this.lastmove = 'down';
    }
    left() {
        this.move[0] = this.move[0] - 1;
        this.lastmove = 'left';
    }
    right() {
        this.move[0] = this.move[0] + 1;
        this.lastmove = 'right';
    }
}

export class Field {
    origin: number[];
    width: number;
    height: number;
    blockmemory: Block[];
    entity: string[][][];
    score: number;
    gameover: boolean;

    constructor() {
        this.origin = [4,0];
        this.width = 12;
        this.height = 21;
        this.blockmemory = [];

        this.entity = GenerateEntity(this.height, this.width);
        this.entity.forEach((eachRow) => {
            eachRow[0][0] = CHARS.WALL;
            eachRow[this.width - 1][0] = CHARS.WALL; 
        });
        this.entity[this.height - 1].forEach((lastRow) => {
            lastRow[0] = CHARS.BOTTOM;
        });

        this.score = 0;
        this.gameover = false;
    }

    fieldInitialize() {
        this.entity = GenerateEntity(this.height, this.width);
        this.entity.forEach((eachRow) => {
            eachRow[0][0] = CHARS.WALL;
            eachRow[this.width - 1][0] = CHARS.WALL; 
        });
        this.entity[this.height - 1].forEach((lastRow) => {
            lastRow[0] = CHARS.BOTTOM;
        });
    }

    cancelBlockmove() {
        const lastBlock: Block = this.blockmemory[this.blockmemory.length - 1];
        switch (lastBlock.lastmove) {
            case 'up':
                lastBlock.down();
                break;
            case 'down':
                lastBlock.up();
                lastBlock.locked = true;
                if (lastBlock.move[1] <= 0){this.gameover = true}
                break;
            case 'left':
                lastBlock.right();
                break;
            case 'right':
                lastBlock.left();
                break;
            case 'new':
                break;
        }
    }

    checkClearLine(){
        let filledRow: number[] = [];
        this.entity.forEach((eachRow,rowNum) => {
            let blockSum: number = 0;
            eachRow.forEach((value) => {
                if(value[0] == CHARS.BLOCK){blockSum = blockSum + 1}
            });
            if (blockSum >= 10){filledRow.push(rowNum);}
        });
        if (filledRow.length > 0){
            filledRow.forEach((rowNum) => {
                this.entity[rowNum].forEach((value) => {
                    value[0] = CHARS.FIELD;
                });
            });
        }
        this.score = this.score + filledRow.length
    }

    checkClearBlock(){
        let existBlockArray: Block[] = [];
        this.blockmemory.forEach((eachBlock) => {
            let isBlockExist: boolean = false;
            eachBlock.entity.forEach((eachRow) => {
                eachRow.forEach((value) => {
                    if(value[0] == CHARS.BLOCK){isBlockExist = true;}
                });
            });
            if(isBlockExist){existBlockArray.push(eachBlock);}
        });
        this.blockmemory = existBlockArray;
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
                let isMoveCancel: boolean = false
                eachRow.forEach((blockValue, colNum) => {
                    if (blockX + colNum > this.width) return;
                    if (blockY + rowNum > this.height) return;
                    if (blockValue[0] == CHARS.BLOCK && 
                        this.entity[blockY + rowNum][blockX + colNum][0] == CHARS.FIELD){
                        this.entity[blockY + rowNum][blockX + colNum]= blockValue;
                    } else if (blockValue[0] == CHARS.BLOCK &&
                                !(this.entity[blockY + rowNum][blockX + colNum][0] == CHARS.FIELD)
                    ){
                        isMoveCancel = true;
                    }
                    else {
                        ;
                    }
                });
                if(isMoveCancel){this.cancelBlockmove()}
            });
        });

        this.checkClearLine();
        this.checkClearBlock();
    }
}