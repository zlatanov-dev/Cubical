const express = require('express');
const config = require('./config');

const app = express();
app.get('/', (req, res) => {
   res.send('Hello!'); 
});


app.get('/cat', (req, res) => {
   res.send('!!!!!')
});


app.listen(config.PORT, () => console.log(`Server running on port: ${config.PORT}`));