const express = require('express');
const response = require('../../../network/response');
const router = express.Router();

const controlller =  require('../user/controller');

router.get('/', function(req, res) {
    const list = controlller.List();
    response.success(req, res, list, 200);
})

module.exports = router;

