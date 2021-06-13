/*
npm init
npm i express
npm i pg
nodemon app.js
*/


const express = require('express');
const ExpressError = require('./ExpressError');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');

const app = express();
app.use('/users', userRoutes)
app.use('/messages', messageRoutes)

app.use(express.json()); //allows json
app.use(express.urlencoded({ extended: true })); //allows form data

app.get('/favicon.ico', (req,res) => {
    res.sendStatus(204)
})

app.use((req,res,next) => {
    next()
})

















// !@#$%^&U*I()!@#$%^&*()_!@#$%^&*()



app.use((req,res,next) => {
    const e = new ExpressError("Page Not Found", 404)
    next(e)
})

app.use((error, req,res,next) => {
    let status = error.status || 500;
    let message = error.msg;
    console.log("status:",status)
    res.status(status).json({
        error: {message, status}
    });
})

module.exports = app;