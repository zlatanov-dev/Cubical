const express = require('express');
const config = require('./config/configuration');
const viewEngineSetup = require('./config/viewEngine')
const cubeController = require('./controllers/cubeControler');

const app = express();
// Configure Express-Handlebars
viewEngineSetup(app);

app.use(express.static('./public'));

// Routing
app.get('/', (req, res) => {
   res.render('index'); 
});

app.get('/about', (req, res) => {
   res.render('about'); 
});

// app.get('/create', (req, res) => {
//    res.render('create'); 
// });

app.get('/create', cubeController.getCreateCube);

app.listen(config.PORT, () => console.log(`Server running on port: ${config.PORT}`));