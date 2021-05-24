const fs = require('fs');
const axios = require('axios');

const argv = process.argv;

function output(text) {
    console.log(text);
    fs.writeFile('output.txt', text, "utf8", err => {
        if(err) {
            console.log("ERROR!!!", err)
        }
    })
}

async function log(promise) {
    console.log(promise);
    promise.then(res => {
        console.log(res);
    })
    console.log(await promise);
}

async function cat(path) {
    const data = await fs.promises.readFile(`${path}`,'utf8');
    return data;
}

async function webCat(url) {
    axios.get(`${url}`)
        .then(res => {
            console.log(res.data)
            return `${res.data}`;
        })
        .catch(err => {
            return `Error fetching ${url}: ${err}`
        });
}



const regEx1 = /.txt/
if(regEx1.exec(argv[2])) {
    log(cat(argv[2]));
    //logCat(argv[2])
}

const regEx2 = /.com/
if(regEx2.exec(argv[2])) {
    console.log(webCat(argv[2]));
    //logWebCat(argv[2])
}

const regEx3 = /--out/
if(regEx3.exec(argv[2])) {
    if(regEx1.exec(argv[3])) {
        output(cat(argv[3]));
        //outputCat(argv[3])
    }
    else if(regEx2.exec(argv[3])) {
        output(webCat(argv[3]));
        //outputWebCat(argv[3]);
    }   
}








// ! FORCED SOLUTION BELOW



async function logCat(path) {
    return await fs.readFile(`${path}`,'utf8',(err,data) => {
        if(err) {
            console.log(`Error: ENOENT: no such file or directory, open ${path}`);
            process.kill(1);
        }
        console.log("DATA: ", '\n', data);

    })
}

async function logWebCat(url) {
    axios.get(`${url}`)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(`Error fetching ${url}:`, err)
        });
}

function outputCat(path) {
    fs.readFile(`${path}`,'utf8',(err,data) => {
        if(err) {
            console.log(`Error: ENOENT: no such file or directory, open ${path}`);
            process.kill(1);
        }
        fs.writeFile('output.txt', data, "utf8", err => {
            if(err) {
                console.log("ERROR!!!", err)
            }
        })
    }
)};

function outputWebCat(url) {
    axios.get(`${url}`)
        .then(res => {
            fs.writeFile('output.txt', res.data, "utf8", err => {
                if(err) {
                    console.log("ERROR!!!", err);
                }
            })
        })
        .catch(err => {
            return `Error fetching ${url}: ${err}`;
        });
};