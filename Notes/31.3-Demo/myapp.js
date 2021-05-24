/*
npm init
npm install axios
npm i faker
npm i fs
*/


// ! To install all from a download package.json
/*
npm install 
*/

const faker = require('faker');
const axios = require('axios');
const helpers = require('./helpers');
const {add, subtract, color} = require('./helpers');

console.log(faker.name.findName());
console.log(helpers.color);
console.log(helpers.subtract(3,1));
console.log(subtract(5,2));
//console.log(axios);

const argv = process.argv;
for (let i = 0; i < argv.length; i += 1) {
    console.log(i, argv[i]);
}

process.on('exit', function(code) {
    console.log(`EXITING WITH CODE: ${code}`);
});

// process.exit(1);



const fs = require('fs');

fs.readFile('hi.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(`ERROR: ${err}`)
        process.kill(1);
    }
    console.log("DATA: ", data)
})

const content = "HELLLLLOOOOOOOO";
fs.writeFile('hi.txt', content, "utf8", err => {
    if(err) {
        console.log("ERROR!!!", err)
    }
    console.log("It worked!")
})

const content3 = " goodbye..";
fs.writeFile('hi.txt', content3, {encoding:"utf8",flag:'a'}, err => {
    if(err) {
        console.log("ERROR!!!", err)
    }
    console.log("It worked!")
})

const content2 = "\n New append";
fs.appendFile('hi.txt', content2, "utf8", err => {
    if(err) {
        console.log("ERROR!!!", err)
    }
    console.log("It worked!")
})

