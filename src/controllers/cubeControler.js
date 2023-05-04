const Cube = require('../models/Cube');
const db = require('../db.json');

exports.getCreateCube = (req, res) => {
    res.render('create'); 
}

exports.postCreateCube = async (req, res) => {
    const {name, description, imageUrl, difficultyLevel} = req.body;
    let cube = new Cube({name, description, imageUrl, difficultyLevel});
    await cube.save();
    res.redirect('/');
};

exports.getDetails = async (req, res) => {
    try {
        const cube = await Cube.findById(req.params.cubeId).lean();

        if(!cube) {
            throw new Error('Invalid cube id!');
        }

        res.render('details', { cube });
    } catch(err) {
        return res.redirect('/404'); // or handle the error in some other way
    }
};
