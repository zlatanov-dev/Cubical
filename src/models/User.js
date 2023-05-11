const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [5,'Username should be at least 5 characters long!'],
        unique: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: 'Username should consist only of latin letters and digits!'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password is too short!'],
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: 'Password should consist only of latin letters and digits!'
        }
    }
});

userSchema.pre('save',async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.method('validatePassword',async function(password) {
    return await bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);
module.exports = User;