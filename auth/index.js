const jwt = require('jsonwebtoken');

function Sign(data) {
    return jwt.sign(data, 'secreto');
}

module.exports = {
    Sign
}