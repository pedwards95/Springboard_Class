
const ExpressError = require('./ExpressError');


function logger(req,res,next) {
    console.log(`Sending ${req.method} request to ${req.path}.`)
    return next();
}

function checkPassword (req,res,next) {
    try {
        if (req.query.password !== 'monkeybreath'){
            throw new ExpressError("Missing Password.", 402);
        }
        return next()
    } catch(e) {
        return next(e)
    }
}




module.exports = {logger, checkPassword};