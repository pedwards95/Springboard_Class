const express = require("express");
const router = new express.Router();
const db = require('../db');
const ExpressError = require("../ExpressError");

router.get("/", async function(req, res, next) {
    try{ 
        let results = await db.query(`SELECT * FROM invoices`);
        return res.json({invoices:results.rows});
    } catch(e) {
        return next(e);
    }
});

router.get("/:id", async function(req, res, next) {
    try{ 
        const {id} = req.params;
        let results = await db.query(`SELECT * FROM invoices WHERE id = $1`, [id]);
        if(results.rows.length === 0) {
            throw new ExpressError(`Cant find invoice with id of ${id}`,404)
        }
        const {amt, paid, add_date, paid_date, comp_code} = results.rows[0];
        const company = await db.query(`SELECT * FROM companies WHERE code = $1`, [comp_code]);
        return res.json({invoice: {id,amt,paid,add_date,paid_date,company:company.rows[0]}})
    } catch(e) {
        return next(e);
    }
});

router.post('/', async (req,res,next) => {
    try {
        const { comp_code,amt } = req.body;
        const results = await db.query('INSERT INTO invoices (comp_code,amt,paid,paid_date) VALUES ($1, $2, $3, $4) RETURNING *',[comp_code,amt,True,getDate()])
        return res.json({invoice: results.rows[0]});
    } catch(e) {
        return next(e)
    }
})

router.put('/id', async (req,res,next) => {
    try {
        const {id} = req.params;
        let invoice = await db.query(`SELECT * FROM invoices WHERE id = $1`, [id]);
        if(invoice.rows.length === 0) {
            throw new ExpressError(`Cant update invoice with id of ${id}`,404)
        }
        const {amt} = req.body;
        const results = await db.query('UPDATE invoices SET amt=$2 WHERE id=$1 RETURNING *',[id,amt])
        return res.json({invoice: results.rows[0]})
    } catch(e) {
        return next(e);
    }
})

router.delete('/:id', async (req,res,next) => {
    try {
        let invoice = await db.query(`SELECT * FROM invoices WHERE id = $1`, [req.params.id]);
        if(invoice.rows.length === 0) {
            throw new ExpressError(`Cant find invoice with id of ${id}`,404)
        }
        db.query('DELETE FROM invoices WHERE id=$1',[req.params.id])
        return res.send({status:"deleted"})
    } catch(e) {
        return next(e);
    }
})

function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}







module.exports = router;