const Cube = require('../models/Cube');

exports.getOne = (cubeId) => {
    return Cube.findById(cubeId).lean();
}

exports.update = (cubeId, data) => {
    // Run validate data
    return Cube.findByIdAndUpdate(cubeId, data, {runValidators: true});
}