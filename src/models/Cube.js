const {Schema, model} = require('mongoose');

const cubeSchema = new Schema({
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
        // Add HTTP/HTTPS validation
    },
    difficultyLevel: {
        type: Number,
        required: true,
        max: 6,
        min: 1,
    },

});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;