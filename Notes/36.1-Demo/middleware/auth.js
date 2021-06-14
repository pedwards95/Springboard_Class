const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config");
const ExpressError = require('../ExpressError');

function authenticateJWT(req, res, next) {
    try {
        const tokenFromBody = req.body._token;
        const payload = jwt.verify(tokenFromBody, SECRET_KEY);
        req.user = payload;
        return next();
    } catch (e) {
        // error here is not a real error, so dont pass on the error.
        return next();
    }
}

function ensureLoggedIn(req,res,next) {
    if(!req.user) {
        const e = new ExpressError(`Unathorized!`,401)
        return next(e);
    }else {
        return next();
    }
}

module.exports = {
    authenticateJWT,
    ensureLoggedIn
};
