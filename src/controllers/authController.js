const router = require('express').Router();
const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try{
        await authService.login(username, password);

    } catch (err) {
        console.log(err);
        return res.redirect('/login');
    }

    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const {username, password, repeatPassword} = req.body;

    if(password !== repeatPassword) {
        return res.redirect('/404');
    }

    const existingUser = await authService.getUserByUsername(username);
    
    if(existingUser){
        return res.redirect('/404');
    }
    await authService.register(username, password);

    res.redirect('/login')
});
module.exports = router;