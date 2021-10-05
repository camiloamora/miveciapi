const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const router = express.Router();
const controller =  require('../user/index');

router.get('/', List);
router.get('/:id', Get);
router.post('/', Update);
router.put('/', secure('update'), Update);

function List(req, res) {
    controller.List()
        .then((list) => {
            response.success(req, res, list, 200);
        })
        .catch((error) => {
            response.error(req, res, error.message, 500);
        });   
}

function Get(req, res) {
    controller.Get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((error) => {
            response.error(req, res, error.message, 500);
        });
}

function Update(req, res) {
    controller.Update(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch((error) => {
            response.error(req, res, error.message, 500);
        });
}

module.exports = router;

