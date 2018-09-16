'use strict';
const responseFormat = require('../helpers/responseFormatHelper');
const CartItemMongoDb = require('../db/cartItemMongoDb');
const Q = require('q');
const _ = require('lodash');

class cartItemMiddleware {
    constructor() { }

    insert(item) {
        const defer = Q.defer();
        const cartItemMongoDb = new CartItemMongoDb();
        cartItemMongoDb.insert(item)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    update(id, item) {
        const defer = Q.defer();
        const cartItemMongoDb = new CartItemMongoDb();
        cartItemMongoDb.update(id, item)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    getAll() {
        const defer = Q.defer();
        const cartItemMongoDb = new CartItemMongoDb();
        cartItemMongoDb.getAll()
            .then(response => {
                const data = {
                    dataItem: response,
                    total: 0
                };
                _.each(response, item => {
                    data.total += item.quantity * item.price;
                });
                defer.resolve(responseFormat.success(data));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    getById(id) {
        const defer = Q.defer();
        const cartItemMongoDb = new CartItemMongoDb();
        cartItemMongoDb.getById(id)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    deleteById(id) {
        const defer = Q.defer();
        const cartItemMongoDb = new CartItemMongoDb();
        cartItemMongoDb.deleteById(id)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }
}

module.exports = cartItemMiddleware;