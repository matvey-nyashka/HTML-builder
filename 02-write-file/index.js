const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');

const writePath = path.join(__dirname, 'text.txt');
let wrStream = fs.createWriteStream(writePath);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

rl.write('Hello, write a text\n(to exit press "CTRL+C" or write "exit")\n');

rl.addListener('line', (input) => {
  if (input === 'exit') {
    rl.write('Good Bye!');
    process.exit(0);
  }
  wrStream.write(input + '\n');
});

rl.addListener('close', function(){
    rl.write('Good Bye!');
    process.exit(0);
});