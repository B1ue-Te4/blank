import * as readline from "readline";

function on(): void {
    readline.cursorTo(process.stdout,0);
    process.stdout.write("|");
};

function off(): void {
    readline.cursorTo(process.stdout,0);
    process.stdout.write("|");
};


setInterval(() => console.log(new Date().),10)