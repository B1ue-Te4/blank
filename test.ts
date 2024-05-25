import readline from "readline";
import { Visualize2DArray} from "./function";
import { Block_T } from "./object";
import { Field } from "./object";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const field = new Field;
const block = new Block_T;

field.loadBlock(block);

while (true) {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    readline.cursorTo(process.stdout,0,0);
    block.down();
    field.materialize();
    rl.write(Visualize2DArray(field.entity));
    console.log(Visualize2DArray(field.entity));
}

setInterval(() => {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    readline.cursorTo(process.stdout,0,0);
    block.down();
    field.materialize();
    rl.write(Visualize2DArray(field.entity));
  },1000);