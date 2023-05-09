const jwt = require('../utils/jsonwebtoken');
const config = require('../config/configuration');


exports.authentication = async function(req, res, next) {
const token = req.cookies['auth'];

    if(token) {
        // Logged user
        try{
            const decodedToken = await jwt.verify(token,config.SECRET);
            req.user = decodedToken;
            req.isAuthenticated = true;
            res.locals.username = decodedToken.username;
            res.locals.isAuthenticated = true;
        } catch(err) {
            console.log(err.message);
            res.clearCookie('auth');
            res.redirect('/404');
        }

    } else {
        // Public user
    }

    next();
};  

exports.isAuthenticated = async function(req, res, next) {
    if(!req.isAuthenticated) {
        return res.redirect('/login');
    }
    next();
};