const router = require('express').Router();

// URL: /accessory/create 
router.get('/create', (req, res) => {
    res.render('accessory/createAccessory');
});

module.exports = router;