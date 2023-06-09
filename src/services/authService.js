const User = require('../models/User');
const config = require('../config/configuration');
const jwt = require('../utils/jsonwebtoken');
const AppError = require('../utils/AppErrror');

exports.getUserByUsername =  (username) => {
    return User.findOne({username});
};

exports.register = async (username, password) => {
    return await User.create({username,password});
};

exports.login = async (username, password) => {
    const user = await this.getUserByUsername(username);
    
    if(!user) {
        throw new AppError('Invalid username or password!', {user});
    }
    const isValid = await user.validatePassword(password);
    
    if(!isValid) {
        throw new AppError('Invalid username or password!');
    }

    const payload = {_id:user._id, username: user.username};
    const token = await jwt.sign(payload, config.SECRET, {expiresIn: '24h'});

    return token;

};