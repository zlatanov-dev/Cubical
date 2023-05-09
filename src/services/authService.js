const User = require('../models/User');
const config = require('../config/configuration');
const jwt = require('../lib/jsonwebtoken');

exports.getUserByUsername =  (username) => {
    return User.findOne({username});
};

exports.register = async (username, password) => {
    return await User.create({username,password});
};

exports.login = async (username, password) => {
    const user = await this.getUserByUsername(username);

    if(!user || !user.validatePassword(password)) {
        throw 'Invalid username or password!';
    }

    const payload = {username: user.username};
    const token = await jwt.sign(payload, config.SECRET, {expiresIn: '24h'});

    return token;

};