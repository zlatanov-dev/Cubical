const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 1,
    },
    password: {
        type: String,
        required: true,
        minLength: [2, 'Password is too short.']
    }
});

userSchema.pre('save',function(next) {
    bcrypt.hash(this.password, 10)
    .then( hash => {
        this.password = hash;
        next();
    });
    // this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);
module.exports = User;