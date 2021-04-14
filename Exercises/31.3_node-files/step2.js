const fs = require('fs');

function cat(path) {
    fs.readFile(`${path}`,'utf8',(err,data) => {
        if(err) {
            console.log(`Error: ENOENT: no such file or directory, open ${path}`);
            process.kill(1);
        }
        console.log("DATA: ", '\n', data);
    })
}

const argv = process.argv;

const regEx1 = /.txt/
if(regEx1.exec(argv[2])) {
    cat(argv[2]);
}


const axios = require('axios');

function webCat(url) {
    axios.get(`${url}`)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(`Error fetching ${url}:`, err)
        });
}

const regEx2 = /.com/
if(regEx2.exec(argv[2])) {
    webCat(argv[2]);
}