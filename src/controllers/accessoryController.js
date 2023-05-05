const router = require('express').Router();
const Accessory = require('../models/Accessory');

// URL: /accessory/create 
router.get('/create', (req, res) => {
    res.render('accessory/createAccessory');
});

router.post('/create', async (req, res) => {
    const {name, description, imageUrl} = req.body
    await Accessory.create({name, description, imageUrl});
    res.redirect('/');
});

router.get('/attach', (req, res) => {
   res.render('accessory/attach'); 
});
module.exports = router;