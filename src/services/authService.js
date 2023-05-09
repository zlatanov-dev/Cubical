const User = require('../models/User');

exports.getUserByUsername =  (username) => {
    return User.findOne({username});
};

exports.register = async (username, password) => {
        await User.create({username,password});
};

exports.login = async (username, password) => {
    const user = await this.getUserByUsername(username);

    if(!user || !user.validatePassword(password)) {
        throw 'Invalid username or password!';
    }

    return user;

};