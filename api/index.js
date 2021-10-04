const bodyParser = require('body-parser');
const express = require('express');
const swaggerUi = require('swagger-ui-express');

const config = require('../config');

const user = require('./components/user/network');
const app = express();

const swaggerDoc = require('./swagger.json');

app.use(bodyParser.json());

// ROUTER
app.use('/api/user', user);
app.use('/apidoc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
})