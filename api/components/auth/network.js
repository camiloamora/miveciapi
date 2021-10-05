const express = require('express');
const response = require('../../../network/response');

const controller = require('./index');

const router = express.Router();

router.post('/login', function (req, res) {
    controller.Login(req.body.username, req.body.password)
        .then(token => {
            console.log(token)
            response.success(req, res, token, 200);
        })
        .catch(error => {
            console.log(error)
            response.error(req, res, 'Invalid information', 400);
        })
})

module.exports = router;