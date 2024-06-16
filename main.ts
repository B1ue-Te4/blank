import readline from "readline";
import { VisualizeEntity } from "./function";
import { Block_T } from "./object";
import { Field } from "./object";

if (process.stdin.isTTY){process.stdin.setRawMode(true)};

readline.emitKeypressEvents(process.stdin);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const field = new Field;
let currentBlock = new Block_T;
field.loadBlock(currentBlock)

let blockInterval: number = 0;

process.stdin.on('keypress', (str, key) => {
    if(key.ctrl == true && key.name == 'c'){
        process.exit();
    }
    switch (key.name) {
        case "w":
            currentBlock.spin();
            blockInterval = 0;
            break;
        case "s":
            currentBlock.down();
            blockInterval = 0;
            break;
        case "a":
            currentBlock.left();
            blockInterval = 0;
            break;
        case "d":
            currentBlock.right();
            blockInterval = 0;
            break;
    }
})

setInterval(() => {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    readline.cursorTo(process.stdout,0,0);
    field.materialize();
    rl.write(VisualizeEntity(field.entity)); 

    blockInterval = blockInterval + 1;

    if(blockInterval > 60){
        currentBlock.down();
        blockInterval = 0;
    }

    if(currentBlock.locked == true){
        currentBlock = new Block_T;
        field.loadBlock(currentBlock);
    }
},16.7);