/*
npm init
npm i express
nodemon app.js
*/


// ! To install all from a download package.json
/*
npm install 
*/

const express = require('express');

const app = express();

app.get('/dogs', (req, res) => {
    res.send("WOOF WOOF");
})

const greetings = {
    en: "hello",
    fr: 'bonjour',
    ic: 'hallo',
    ja: 'konnichiwa'
}

app.get('/greet/:language',(req,res) => {
    return res.send(`GREETINGS!!!  ${greetings[req.params.language]}`);
})

app.get('/search',(req,res) => {
    const {term,cute} = req.query;
    return res.send(`SEARCH PAGE! Term is ${term} and cute is ${cute}.`);
    // http://localhost:3000/search?term=pig&cute=yes
})

app.get('show-me-headers', (req, res) => {
    console.log(req.rawHeaders)
    console.log(req.headers)
    return req.send(req.headers)
})






app.listen(3000, function () {
    console.log('App on port 3000');
  })