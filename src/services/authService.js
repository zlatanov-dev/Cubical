const User = require('../models/User');

exports.getUserByUsername =  (username) => {
    return User.findOne({username});
}

exports.register = async (username, password) => {
        await User.create({username,password});
}