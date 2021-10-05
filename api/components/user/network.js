const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const router = express.Router();
const controller =  require('./index');

router.get('/', List);
router.get('/:id', Get);
router.post('/', Insert);
router.put('/', secure('update'), Update);

function List(req, res, next) {
    controller.List()
        .then((list) => {
            response.success(req, res, list, 200);
        })
        .catch(next);
}

function Get(req, res, next) {
    controller.Get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}

function Update(req, res, next) {
    controller.Update(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
}

function Insert(req, res, next) {
    controller.Create(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
}

module.exports = router;

