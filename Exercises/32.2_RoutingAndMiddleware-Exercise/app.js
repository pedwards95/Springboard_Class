/*
npm init
npm i express
npm i --save-dev supertest
nodemon app.js
*/


const express = require('express');
const ExpressError = require('./ExpressError');
const database = require('./fakeDb');

const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/items', (req,res,next) => {
  return res.json(database)
})

app.get('/items/:name', (req,res,next) => {
    item = database.find(item => item.name === req.params.name) || "Not Found"
    return res.json(item)
  })

app.post('/items', (req,res,next) => {
    let item;
    try {
        if (!req.body.name) throw new ExpressError("Name is required", 400);
        if (!req.body.price) throw new ExpressError("Price is required", 400);
        item = {"name": req.body.name, "price":req.body.price}
        database.push(item);
    } catch(e) {
        return next(e)
    }
    return res.json({'added':item})
})

app.patch('/items/:name', (req,res,next) => {
    let item;
    try {
        if (!req.body.name) throw new ExpressError("New Name is required", 400);
        if (!req.body.price) throw new ExpressError("New Price is required", 400);
        if (!req.params.name) throw new ExpressError("Original name is required", 400);
        oldItem = database.find(item => item.name === req.params.name)
        if(!oldItem) {
            throw new ExpressError("Item not found", 404);
        }
        oldItem.name = req.body.name;
        oldItem.price = req.body.price;
    } catch(e) {
        return next(e)
    }
    return res.json({'changed':oldItem})
})

app.delete('/items/:name', (req,res,next) => {
    let item = database.find(item => item.name === req.params.name)
    if(!item) {
        throw new ExpressError("Item not found", 404);
    }
    database.splice(item,1)
    return res.json({"deleted":item})
  })












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

app.listen(3000, function () {
    console.log('App on port 3000');
  })