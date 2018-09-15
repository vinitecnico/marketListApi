'use strict';

const ProductMiddleware = require('../middlewares/productMiddleware');
const config = require('../config');
const Q = require('q');

module.exports = function (app) {

    app.get('/api/product', (req, res) => {
        const productMiddleware = new ProductMiddleware();
        productMiddleware.getAll()
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.get('/api/product/:id', (req, res) => {
        const id = req.param('id');
        const productMiddleware = new ProductMiddleware();
        productMiddleware.getById(id)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.post('/api/product', function (req, res) {
        const product = req.body;
        const productMiddleware = new ProductMiddleware();
        productMiddleware.insert(product)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });

    app.put('/api/product/:id', function (req, res) {
        const id = req.param('id');
        const product = req.body;
        const productMiddleware = new ProductMiddleware();
        productMiddleware.update(id, product)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });

    app.delete('/api/product/:id', function (req, res) {
        const id = req.param('id');
        const product = req.body;
        const productMiddleware = new ProductMiddleware();
        productMiddleware.deleteById(id, product)
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