'use strict';

const CartItemMiddleware = require('../middlewares/cartItemMiddleware');
const config = require('../config');
const Q = require('q');

module.exports = function (app) {

    app.get('/api/cartItem', (req, res) => {
        const cartItemMiddleware = new CartItemMiddleware();
        cartItemMiddleware.getAll()
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.get('/api/cartItem/:id', (req, res) => {
        const id = req.param('id');
        const cartItemMiddleware = new CartItemMiddleware();
        cartItemMiddleware.getById(id)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.post('/api/cartItem', function (req, res) {
        const item = req.body;
        const cartItemMiddleware = new CartItemMiddleware();
        cartItemMiddleware.insert(item)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });

    app.put('/api/cartItem/:id', function (req, res) {
        const id = req.param('id');
        const item = req.body;
        const cartItemMiddleware = new CartItemMiddleware();
        cartItemMiddleware.update(id, item)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });

    app.delete('/api/cartItem/:id', function (req, res) {
        const id = req.param('id');
        const cartItemMiddleware = new CartItemMiddleware();
        cartItemMiddleware.deleteById(id)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });
};