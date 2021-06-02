/*
npm init
npm i axios
npm i fs
*/

const fs = require('fs');
const axios = require('axios');

const argv = process.argv;
let myFileName = process.argv[2];
for (let i = 0; i < argv.length; i += 1) {
    console.log(i, argv[i]);
}

fs.readFile(myFileName, 'utf8', (err, data) => {
    if(err) {
        console.log(`ERROR: ${err}`)
        process.kill(1);
    }
    const webUrls = data.split('\n');
    requestUrls(webUrls);
})

function requestUrls(urls) {
    for (url of urls) {
        if(url) {
            asyncRequest(url);
        }
    }
}

async function asyncRequest(url) {
    let res = await axios.get(url);
    console.log(res);
    //let res = "hi";
    const fileName = cleanUrl(url);
    fs.writeFile(fileName, res.data, "utf8", err => {
        if(err) {
            console.log("ERROR!!!", err)
        }
        else {
            console.log("It worked!")
        }
        
    })
}

function cleanUrl(text) {
    text = text.replace("https://","");
    text = text.replace("http://","");
    text = text.replaceAll("/","_");
    console.log(text);
    return text;
}