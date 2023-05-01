const express = require('express');

const routes = require('./router/routes');
const config = require('./config/configuration');
const viewEngineSetup = require('./config/viewEngine')

const app = express();
// Configure Express-Handlebars
viewEngineSetup(app);

app.use(express.static('./public'));
app.use(routes);

app.listen(config.PORT, () => console.log(`Server running on port: ${config.PORT}`));