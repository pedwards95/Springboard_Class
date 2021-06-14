const express = require('express');
const ExpressError = require('./ExpressError');
const router = new express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {BCRYPT_WORK_FACTOR, SECRET_KEY} = require("../config")
const {ensureLoggedIn} = require("../middleware/auth")


const { router } = require("../app");

router.length('/', (req,res,next) => {
    res.send("APP IS WORKING");
})

router.post('/register', async (req,res,next) => {
    try{
        const{username, password} = req.body;
        if(!username|| !password) {
            throw new ExpressError(`Username and password are both required!`,400)
        }
        const hashedPassword = await bcrypt.hash(password,BCRYPT_WORK_FACTOR);
        const result = await db.query(`
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING username`,
        [username, hashedPassword]);
        return res.json({results:result.rows[0]});

    } catch(e) {
        if(e.code === "23505") {
            return next(new ExpressError(`Username is taken! Please choose another.`,400));
        }
        return next(e);
    }
})

router.post('/login', async (req,res,next) => {
    try{
        const{username, password} = req.body;
        if(!username|| !password) {
            throw new ExpressError(`Username and password are both required!`,400)
        }
        const results = await db.query(`
        SELECT username, password
        FROM users
        WHERE username = $1`,
        [username]);
        const user = results.rows[0];
        if(user){
            if(bcrypt.compare(password,user.password)) {
                const token = jwt.sign({username: username},SECRET_KEY)
                return res.json({msg:'Logged in!'},token);
            }
        }
        throw new ExpressError(`Invalid username/password!`,400)

    } catch(e) {
        if(e.code === "23505") {
            return next(new ExpressError(`Username is taken! Please choose another.`,400));
        }
        return next(e);
    }
})

// router.get('/secret', async (req,res,next) => {
//     try{
//         const token = req.body._token;
//         const data = jwt.verify(token, SECRET_KEY);
//         return res.json({msg:"SIGNED IN"});

//     } catch(e) {
//         return next(new ExpressError(`Please login first!`,401));
//     }
// })

router.get('/secret', ensureLoggedIn, async (req,res,next) => {
    try{
        return res.json({msg:`WELCOME ${req.user.username}`});

    } catch(e) {

        return next(new ExpressError(`Please login first!`,401));
    }
})

module.exports = router;

