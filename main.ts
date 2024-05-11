import readline from "readline";
import { Generate2DArray } from "./function";
import { Visualize2DArray} from "./function";
import { Block_T } from "./block";

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const block = new Block_T;

process.stdin.on('keypress', (str, key) => {
      if(key.ctrl == true && key.name == 'c'){
          process.exit()
      };
      if(key.name == "s"){
        block.spin()
      }
      readline.clearScreenDown(process.stdout);
      readline.cursorTo(process.stdout,0,0);
      rl.write(Visualize2DArray(block.entity));
});