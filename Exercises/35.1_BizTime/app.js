/*
npm init
npm i express
npm i pg
nodemon server.js
*/


const express = require('express');
const ExpressError = require('./ExpressError');
const companyRoutes = require('./routes/companies');
const invoiceRoutes = require('./routes/invoices');

const app = express();
app.use('/companies', companyRoutes)
app.use('/invoices', invoiceRoutes)


app.use(express.json()); //allows json
app.use(express.urlencoded({ extended: true })); //allows form data

app.get('/favicon.ico', (req,res) => {
    res.sendStatus(204)
})

app.use((req,res,next) => {
    next();
})








// !@#$%^&U*I()!@#$%^&*()_!@#$%^&*()

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

module.exports = app;