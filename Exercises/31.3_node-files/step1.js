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

cat(argv[2]);