const express = require("express");
const router = new express.Router();
const db = require('../db');
const ExpressError = require("../ExpressError");

router.get("/", async function(req, res, next) {
    try{ 
        let results = await db.query(`SELECT * FROM companies`);
        return res.json({companies:results.rows});
    } catch(e) {
        return next(e);
    }
});

router.get("/:code", async function(req, res, next) {
    try{ 
        const {code} = req.params;
        let results = await db.query(`SELECT * FROM companies WHERE code = $1`, [code]);
        if(results.rows.length === 0) {
            throw new ExpressError(`Cant find company with code of ${code}`,404)
        }
        console.log(results.rows[0].code)
        let invoices = await db.query(`SELECT * FROM invoices WHERE comp_code = $1`, [results.rows[0].code]);
        results.rows[0].invoices = invoices.rows;
        return res.json({company:results.rows[0]});
    } catch(e) {
        return next(e);
    }
});

router.post('/', async (req,res,next) => {
    try {
        const { code,name,description } = req.body;
        const results = await db.query('INSERT INTO companies (code,name,description) VALUES ($1, $2, $3) RETURNING *',[code,name,description])
        return res.json({company: results.rows[0]});
    } catch(e) {
        return next(e)
    }
})

router.put('/:oldCode', async (req,res,next) => {
    try {
        const {oldCode} = req.params;
        let company = await db.query(`SELECT * FROM companies WHERE code = $1`, [oldCode]);
        if(company.rows.length === 0) {
            throw new ExpressError(`Cant update company with code of ${oldCode}`,404)
        }
        const { code,name,description } = req.body;
        code = code || oldCode;
        name = name || company.name;
        description = description || company.description;
        const results = await db.query('UPDATE companies SET code=$1, name=$2, description=$3 WHERE code=$4 RETURNING code, name, description',[code,name,description,oldCode])
        return res.json({company: results.rows[0]})
    } catch(e) {
        return next(e);
    }
})

router.delete('/:code', async (req,res,next) => {
    try {
        let company = await db.query(`SELECT * FROM companies WHERE code = $1`, [req.params.code]);
        if(company.rows.length === 0) {
            throw new ExpressError(`Cant find company with code of ${code}`,404)
        }
        db.query('DELETE FROM companies WHERE code=$1',[req.params.code])
        return res.send({status:"deleted"})
    } catch(e) {
        return next(e);
    }
})







module.exports = router;