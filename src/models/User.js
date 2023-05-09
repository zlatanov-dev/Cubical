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

userSchema.pre('save',async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.method('validatePassword',async function(password) {
    return await bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);
module.exports = User;