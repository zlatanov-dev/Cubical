const Cube = require('../models/Cube');

exports.getOne = (cubeId) => {
    return Cube.findById(cubeId).lean();
}