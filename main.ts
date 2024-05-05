import * as readline from "readline";
import { Generate2DArray } from "./function";
import { Visualize2DArray} from "./function";
import { Block_T } from "./block";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const block = new Block_T

while (true) {
rl.question("command?", input => {
    if (input === "spin") {
        block.spin();
        readline.clearLine(process.stdin,0)
        rl.pause
        rl.write(Visualize2DArray(block.entity));
        rl.prompt();
    };
});
}