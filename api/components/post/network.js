const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', List);
router.get('/:id', Get);
router.get('/like', PostLiked);
router.get('/id:/like', PostLikers);
router.post('/', Update);
router.post('/:id/like', Like);

function List(req, res, next) {
    controller.List()
        .then(post => {
            response.success(req, res, post, 200);
        })
        .catch(next);
}

function Get(req, res, next) {
    controller.Get(req.params.id)
        .then(post => {
            response.success(req, res, post, 200);
        })
        .catch(next);
}

function PostLiked(req, res, next) {
    controller.PostLiked(req.user.sub)
        .then(post => {
            response.success(req, res, post, 200);
        })
        .catch(next);
}

function PostLikers(req, res, next) {
    controller.PostLikers(req.params.id)
        .then(post => {
            response.success(req, res, post, 200);
        })
        .catch(next);
}

function Like(req, res, next) {
    controller.Like(req.params.id, req.user.sub)
        .then(post => {
            response.success(req, res, post, 201);
        })
        .catch(next)
}

function Update(req, res, next) {
    controller.Update(req.body, req.user.id)
        .then(post => {
            response.success(req, res, post, 201);
        })
        .catch(next);
}

module.exports = router;
