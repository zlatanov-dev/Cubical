const router = require('express').Router();
const Accessory = require('../models/Accessory');

// URL: /accessories/create 
router.get('/create', (req, res) => {
    res.render('accessory/createAccessory');
});

router.post('/create', async (req, res) => {
    try{
        const {name, description, imageUrl} = req.body
        await Accessory.create({name, description, imageUrl});
        res.redirect('/');
    } catch(err) {
        console.log(err.message);
        return res.redirect('/404');
    }
    
});

module.exports = router;