const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function Sign(data) {
    return jwt.sign(data, secret);
}

function Verify(token){
    return jwt.verify(token, secret);
}

const Check = {
    own: function(req, owner) {
        const decode = DecodeHeader(req);

        if(decode.id !== owner) {
            throw error('You can`t do this', 401);
        }
    },

    logged: function(req) {
        const decoded = DecodeHeader(req);
        
        if(decoded.id === undefined) {
            throw error('You can`t do this', 401);
        }
    },
}

function GetToken(auth) {
    if(!auth) {
        throw error('without token', 401);
    }

    if(auth.indexOf('Bearer ') === -1) {
        throw new error('Invalid Format', 401);
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