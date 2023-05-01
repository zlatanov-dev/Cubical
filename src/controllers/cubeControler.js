const Cube = require('../models/Cube');
const db = require('../db.json');

exports.getCreateCube = (req, res) => {
    res.render('create'); 
}

exports.postCreateCube = (req, res) => {
    const {name, description, imageUrl, difficultyLevel} = req.body;
    let cube = new Cube(name, description, imageUrl, difficultyLevel);
    Cube.save(cube);
    // Redirect
    res.redirect('/');
};

exports.getDetails = (req, res) => {
    let cubeId = Number(req.params.cubeId);
    let cube = db.cubes.find(x => x.id === cubeId);

    if(!cubeId || !cube) {
        return res.redirect('/404');
    }

    res.render('details', {cube})
};