const express = require('express');
const cookieParser = require('cookie-parser');

const routes = require('./router/routes');
const config = require('./config/configuration');
const viewEngineSetup = require('./config/viewEngine');
const initDatabase = require('./config/initDatabase');
const authMiddleware = require('./middlewares/authMiddleware')

const app = express();
// Configure Express-Handlebars
viewEngineSetup(app);

app.use(express.static('./public'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(authMiddleware.authentication);
app.use(routes);

// Initialize the database
initDatabase()
    .then(() => app.listen(config.PORT, () => console.log(`Server running on port: ${config.PORT}`)))
    .catch(err => console.error(err.message));