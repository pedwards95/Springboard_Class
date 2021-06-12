/* Routes for sample app. */

const express = require("express");
const router = new express.Router();
const db = require('../db');
const ExpressError = require("../ExpressError");


router.get("/", async function(req, res, next) {
    try{ 
        console.log('boop');
        let results = await db.query(`SELECT id, user_id, msg FROM messages`);
        return res.json({messages:results.rows});
    } catch(e) {
        return next(e);
    }
});

router.get('/:id1', async (req,res,next) => {
    try {
        const {id1} = req.params;
        const results = await db.query(`
            SELECT m.id, m.msg, t.tag
            FROM messages AS m
            LEFT JOIN messages_tags AS mt
            ON m.id = mt.message_id
            LEFT JOIN tags AS t
            ON mt.tag_code = t.code
            WHERE m.id = $1`
        , [id1])
        
        if(results.rows.length === 0) {
            throw new ExpressError(`Cant find user with id of ${id1}`,404)
        }
        const {id,msg} = results.rows[0];
        const tags = results.rows.map(r => r.tag);
        return res.send({id,msg,tags});
    } catch(e) {
        console.log(e)
        return next(e)
    }
})

router.patch('/:id', async (req,res,next) => {
    try {
        const {id} = req.params;
        const {msg} = req.body;
        const results = await db.query(`
            UPDATE messages SET msg=$1, WHERE id=$2 RETURNING *`
        ,[msg,id])
        if(results.rows.length === 0) {
            throw new ExpressError(`Cant update user with id of ${id}`,404)
        }
        return res.json({message: results.rows[0]})
    } catch(e) {
        return next(e);
    }
})

module.exports = router;