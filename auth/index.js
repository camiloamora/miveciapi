const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.jwt.secret;

function Sign(data) {
    return jwt.sign(data, secret);
}

function Verify(token){
    return jwt.sign(token, secret);
}

const Check = {
    own: function(req, owner) {
        const decode = DecodeHeader(req);

        if(decode.id !== owner) {
            throw new Error('You can`t do this');
        }
    }
}

function GetToken(auth) {
    if(!auth) {
        throw new Error('without token');
    }

    console.log('auth', auth)
    if(auth.indexOf('Bearer ') === -1) {
        throw new Error('Invalid Format');
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function DecodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = GetToken(authorization);
    const decoded = Verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    Sign,
    Check,
}