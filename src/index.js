const express = require('express');
const config = require('./config/configuration');
const viewEngineSetup = require('./config/viewEngine')

const app = express();
// Configure Express-Handlebars
viewEngineSetup(app);

app.use(express.static('./public'));
app.get('/', (req, res) => {
   res.render('index'); 
});

app.listen(config.PORT, () => console.log(`Server running on port: ${config.PORT}`));