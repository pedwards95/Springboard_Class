const express = require('express');
const ExpressError = require('./ExpressError');

const app = express();

app.use(express.json()); //allows json
app.use(express.urlencoded({ extended: true })); //allows form data
app.use((req,res,next) => {
    console.log("THE SERVER GOT A REQUEST")
    next()
})



app.post('/register', (req,res) => {
    res.send(`Welcome, ${req.body.username}`)
})

const candies = [
    {name: 'snickers', qty:43, price: 1.50 },
    {name: 'skittles', qty:26, price: 0.99 }
]

app.get('/candies', (req, res) => {
    return res.json(candies)
})

app.post('/candies', (req, res) => {
    if(req.body.name.toLowerCase() === "circus peanuts") {
        res.status(403).json({msg: "HORRIBLE CHOICE> CIRCUS PEANUTS FORBIDDEN!"})
    }
    candies.push(req.body)
    return res.status(201).json(candies)
})

app.get("/secret", (req,res) => {
    if (req.query.password != 'popcorn'){
        return res.status(403).send("invalid password")
    }
    return res.send("CONGRATS YOU KNOW THE PASSWORD")
})

function attemptToSaveToDB() {
    throw "Connection Error!"
}

app.get('/savetodb', (req,res) => {
    attemptToSaveToDB()
    res.send("SAVED TO DB")
})

app.get("/secret2", (req,res,next) => {
    try {
        if (req.query.password != 'popcorn') {
            throw new ExpressError("invalid password", 403)
        }
        return res.send("CONGRATS YOU KNOW THE PASSWORD")
    } catch(e) {
        next(e)
    }
    
    
})

//I didnt set up anything to use it, but if one of the endpoints calls next(), then this end 'catch all' would run
app.use((req,res,next) => {
    const e = new ExpressError("Page Not Found", 404)
    next(e)
})

//using next(err) passes the error to this catchall. i did impliment this one.
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