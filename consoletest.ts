import * as readline from "readline";

function waitanime(): void {

    readline.clearLine;
    readline.cursorTo(process.stdout,0);
    process.stdout.write("|");
    readline.clearLine;
    readline.cursorTo(process.stdout,0);
    process.stdout.write("/");
    readline.clearLine;
    readline.cursorTo(process.stdout,0);
    process.stdout.write("-");
    readline.clearLine;
    readline.cursorTo(process.stdout,0);
    process.stdout.write("\\");
    readline.clearLine;
    readline.cursorTo(process.stdout,0);
    process.stdout.write("|");

};

setInterval(() => console.log(new Date()),10)