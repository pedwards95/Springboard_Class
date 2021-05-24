/*
npm init
npm i express
nodemon app.js
*/

const express = require('express');
const ExpressError = require('./ExpressError');

const app = express();

app.use(express.json()); //allows json
app.use(express.urlencoded({ extended: true })); //allows form data

app.get('/mean', (req, res) => {
    if(!req.query.nums) {
        throw new ExpressError("No input given!", 400)
    }
    let nums = req.query.nums.split(',');
    let total = 0;
    for (num of nums){
        num = Number(num)
        if(!num) {
            throw new ExpressError(`${num} is not a number!`, 400)
        }
        total = total+num;
    }
    let mean = total/nums.length
    res.json({operation:"mean",value:mean});
})

app.get('/median', (req, res) => {
    if(!req.query.nums) {
        throw new ExpressError("No input given!", 400)
    }
    let nums = req.query.nums.split(',');
    for (num of nums){
        num = Number(num)
        if(!num && num != 0) {
            throw new ExpressError(`${num} is not a number!`, 400)
        }
    }
    let median = 0;
    if(nums.length % 2 == 0)
    {
        //12345
        median = [nums[(nums.length/2)-1], nums[(nums.length/2)]];
    }
    else {
        median = nums[(nums.length-1)/2];
    }
    res.json({operation:"median",value:median});
})

app.get('/mode', (req, res) => {
    if(!req.query.nums) {
        throw new ExpressError("No input given!", 400)
    }
    let nums = req.query.nums.split(',');
    let total = 0;
    for (num of nums){
        num = Number(num)
        if(!num && num != 0) {
            throw new ExpressError(`${num} is not a number!`, 400)
        }
    }
    let currentMode = nums[0]
    let currentMax = 0
    let count = 0
    let doneNumbers = []
    for(num in nums)
    {
        if(doneNumbers.includes(num)){
            continue;
        }
        doneNumbers.push(num);
        for(let i = 0; i<nums.length;i++) {
            if(nums[i] == num) {
                count = count+1;
            }
        }
        if(count > currentMax) {
            currentMode = num
            currentMax = count
        }
        count = 0
    }
    res.json({operation:"mode",value:currentMode});
})






app.use((req,res,next) => {
    const e = new ExpressError("Page Not Found", 404)
    next(e)
})

app.use((error, req,res,next) => {
    let status = error.status || 500;
    let message = error.msg;
    console.log("status:",error.status)
    res.status(status).json({
        error: {message, status}
    });
})

app.listen(3000, function () {
    console.log('App on port 3000');
  })