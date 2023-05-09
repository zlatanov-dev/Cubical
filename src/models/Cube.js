const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        // Check Max length
        maxLength: 50,

    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^http[s]?:\/\//, 'Invalid URL!'],
    },
    difficultyLevel: {
        type: Number,
        required: true,
        max: 6,
        min: 1,
    },
    
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
         

});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;