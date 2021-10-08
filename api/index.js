const bodyParser = require('body-parser');
const express = require('express');
const swaggerUi = require('swagger-ui-express');

const config = require('../config');

const user = require('./components/user/network');
const auth = require('./components/auth/network');
const post = require('./components/post/network');
const errors = require('../network/errors');
const app = express();
const cors = require('cors');

const swaggerDoc = require('./swagger.json');

app.use(bodyParser.json());

// ROUTER
app.use(cors);

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('/apidoc',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc),
);
app.use(errors);

const server = app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
})

module.exports = { app, server}
