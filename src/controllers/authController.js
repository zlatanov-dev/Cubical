const router = require('express').Router();
const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try{
        const token = await authService.login(username, password);
        res.cookie('auth', token, {httpOnly: true});
    } catch (err) {
        console.log(err.message);
        return res.render('auth/login', {error: err.message});
    }
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const {username, password, repeatPassword} = req.body;

    if(password !== repeatPassword) {
       return res.render('auth/register', {error: "Passwords don\'t match!"});
    }

    const existingUser = await authService.getUserByUsername(username);
    
    if(existingUser){
       return res.render('auth/register', {error: "Username already exists!"});
    }

    try{
         await authService.register(username, password);
        } catch(err) {
        const error = Object.keys(err.errors).map(key => err.errors[key].message);
        console.log(error);
        return res.render('auth/register', {error: error[0]});
    }
    res.redirect('/login')
});

router.get('/logout', async (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;