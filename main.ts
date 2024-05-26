import readline from "readline";
import { Visualize2DArray} from "./function";
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

setInterval(() => {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    readline.cursorTo(process.stdout,0,0);
    field.materialize();
    rl.write(Visualize2DArray(field.entity)); 
    
    if(currentBlock.locked == true){
        currentBlock = new Block_T;
    }

    process.stdin.on('keypress', (str, key) => {
        if(key.ctrl == true && key.name == 'c'){
            process.exit();
        }
        switch (key.name) {
            case "w":
                currentBlock.spin();
                break;
            case "s":
                currentBlock.down();
                break;
            case "a":
                currentBlock.left();
                break;
            case "d":
                currentBlock.right();
                break;
        }
    })
},16.7);

