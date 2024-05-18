import readline from "readline";
import { Visualize2DArray} from "./function";
import { Block_T } from "./object";
import { Field } from "./object";

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY){process.stdin.setRawMode(true)};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const field = new Field;

process.stdout.write('\u001B[2J\u001B[0;0f');
rl.write(Visualize2DArray(field.entity));

const block = new Block_T;

setInterval(() => {
  block.down();
  console.log(block.move[0].toString() + "," + block.move[1].toString());
},1000);

setInterval(() => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  readline.cursorTo(process.stdout,0,0);
},1000);

process.stdin.on('keypress', (str, key) => {
  if(key.ctrl == true && key.name == 'c'){
    process.exit();
  };
  if(key.name == "w"){
    block.spin();
  };
  if(key.name == "s"){
    block.down()
  };
  if(key.name == "a"){
    block.left();
  };
  if(key.name == "d"){
    block.right();
  };
  if(key.name == "x"){
  };
});