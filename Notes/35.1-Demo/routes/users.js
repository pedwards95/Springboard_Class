/* Routes for sample app. */

const express = require("express");
const router = new express.Router();
const db = require('../db');
const ExpressError = require("../ExpressError");


/** GET /users: get list of users */

router.get("/", async function(req, res, next) {
    try{ 
        let results = await db.query(`SELECT * FROM users`);
        return res.json({users:results.rows});
    } catch(e) {
        return next(e);
    }
});

router.get("/search", async(req,res,next) =>{
    try{
        const type = req.query.type;
        const results = await db.query(`SELECT * FROM users WHERE type=$1`, [type]);
        return res.json(results.rows);
    } catch(e) {
        return next(e);
    }
})

router.get('/:id', async (req,res,next) => {
    try {
        const {id} = req.params;
        const results = await db.query('SELECT * FROM users WHERE id = $1',[id])
        if(results.rows.length === 0) {
            throw new ExpressError(`Cant find user with id of ${id}`,404)
        }
        return res.send({user: results.rows[0]});
    } catch(e) {
        return next(e)
    }
})

router.post('/:id', async (req,res,next) => {
    try {
        const {id} =req.params;
        const { name,type } = req.body;
        const results = await db.query('INSERT INTO users (name, type) VALUES ($1, $2) RETURNING *',[name,type])
        return res.json(results.rows);
    } catch(e) {
        return next(e)
    }
})

router.patch('/', async (req,res,next) => {
    try {
        const {name,type} = req.body;
        const results = await db.query('UPDATE users SET name=$1, type=$2 WHERE id=$3 RETURNING id, name, type',[name,type,id])
        return res.send(results.rows[0])
    } catch(e) {
        return next(e);
    }
})

router.delete('/', async (req,res,next) => {
    try {
        db.query('DELETE FROM users WHERE id=$1',[req.params.id])
        return res.send({msg:"DELETED"})
    } catch(e) {
        return next(e);
    }
})



module.exports = router;