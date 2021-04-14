/** Command-line tool to generate Markov text. */

const markov = require('./markov');
const fs = require('fs');

fs.readFile('./eggs.txt', 'utf8',(err,text) => {
    if(err) {
        console.log(`Error: ENOENT: no such file or directory, open ${path}`);
        process.kill(1);
    }
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText(numWords=100));
})