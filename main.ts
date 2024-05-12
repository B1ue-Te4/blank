import readline from "readline";
import { Visualize2DArray} from "./function";
import { Block_T } from "./object";
import { Field } from "./object";

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const block = new Block_T;
const field = new Field;
field.loadBlock(block)

process.stdin.on('keypress', (str, key) => {
      if(key.ctrl == true && key.name == 'c'){
          process.exit();
      };

      if(key.name == "w"){
        block.spin();
        field.loadBlock(block);
      };

      if(key.name == "s"){
        block.down()
        field.loadBlock(block);
      }

      if(key.name == "a"){
        block.left();
        field.loadBlock(block);
      };

      if(key.name == "d"){
        block.right();
        field.loadBlock(block);
      };

      process.stdout.write('\u001B[2J\u001B[0;0f');
      readline.cursorTo(process.stdout,0,0);

      rl.write(Visualize2DArray(field.entity));
});