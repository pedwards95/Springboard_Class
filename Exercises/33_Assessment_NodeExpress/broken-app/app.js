/*
npm init
npm i axios
npm i express
nodemon app.js
*/

//dependencies
const express = require('express');
let axios = require('axios');
const ExpressError = require('./ExpressError');

//startup
var app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', (req, res, next) => {
  try {

    // checks if data in body of request
    if (!req.body.developers) throw new ExpressError("Developers (in an array) are required", 400);


    // let results = req.body.developers.map(async name => {
    //   return (await axios.get(`https://api.github.com/users/${name}`));
    // });
    // console.log("RESULTS:",results);

    
    let gitHubResults = [];

    //sends the requests and puts them in array
    (async function() {
      for(name of req.body.developers) {
      gitHubResults.push(await axios.get(`https://api.github.com/users/${name}`))
      }

    //maps out the data recieved into another array, so it can be sent to the requester
    let dataOut = gitHubResults.map(r => {
      if(r) {
        return { name: r.data.name, bio: r.data.bio }
      } else {
        throw new ExpressError("Request refused by Github! Please try again later.", 500);
      }
    });

    return res.send(JSON.stringify(dataOut));
    })();
  
  } catch(err) {
    next(err);
  }
});





app.use((req,res,next) => {
  const e = new ExpressError("Page Not Found", 404)
  next(e)
})

app.use((error, req,res,next) => {
    console.log(error)
  let status = error.status || 500;
  let message = error.msg || "UNIDENTIFIED ERROR";
  console.log("status:",error.status)
  res.status(error.status).json({
      error: {message, status}
  });
})

//listening of localhost:3000
app.listen(3000);
