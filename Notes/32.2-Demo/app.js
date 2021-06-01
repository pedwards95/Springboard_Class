/*
npm init
npm i express
npm i morgan
npm i --save-dev supertest
nodemon app.js
*/


const express = require('express');
const ExpressError = require('./ExpressError');
const userRoutes = require('./userRoutes');
const middleware = require('./middleware');
const morgan = require('morgan'); // logger

const app = express();

app.use(middleware.logger)
app.use(morgan('dev'))

app.use('/users', userRoutes)
app.get('/favicon.ico', (req,res) => {
    res.sendStatus(204)
})

app.get('/secret', middleware.checkPassword, (req,res,next) => {
    try {
        if (req.query.password !== 'monkeybreath'){
            throw new ExpressError("Missing Password.", 402)
        }
        return res.send("I LOVE YOU <3")
    } catch(e) {
        return next(e)
    }
})

app.get('/private', middleware.checkPassword, (req,res,next) => {
    try {
        if (req.query.password !== 'monkeybreath'){
            throw new ExpressError("Missing Password.", 402)
        }
        return res.send("This is a private page")
    } catch(e) {
        return next(e)
    }
})

app.get('/favicon.ico', (req,res) => {
    res.sendStatus(204)
})





app.use((req,res,next) => {
    const e = new ExpressError("Page Not Found", 404)
    next(e)
})

app.use((error, req,res,next) => {
    let status = error.status || 500;
    let message = error.msg;
    console.log("status:",error.status)
    res.status(error.status).json({
        error: {message, status}
    });
})

app.listen(3000, function () {
    console.log('App on port 3000');
  })