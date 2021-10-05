const response = require('./response');

function Errors(err, req, res, next) {
    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;

    response.error(req, res, message, status);
}

module.exports = Errors;