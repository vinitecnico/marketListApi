'use strict';
const mongodb = require('./mongoDb');
const Q = require('q');
const moment = require('moment');
const cartItemSchema = require('../schema/cartItemSchema');

class cartItemMongoDb {

    constructor() { }

    insert(item) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                item.created_at = new moment().toDate();
                item.updated_at = new moment().toDate();

                let cartItemDb = new cartItemSchema(item);
                cartItemDb.save(function (error, result) {
                    if (error) {
                        defer.reject(error.message);
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }

    update(id, item) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                const newData = {
                    product: item.product,
                    quantity: item.quantity,
                    price: item.price,
                    updated_at: new moment().toDate()
                };

                db.model('cartItem').findOneAndUpdate({ _id: id }, newData, { upsert: true }, function (err, result) {
                    if (err || !result) {
                        defer.reject(err.message);
                    } else {
                        defer.resolve(newData);
                    }
                });
            });
        return defer.promise;
    }

    getAll() {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                const filter = null;
                var query = db.model('cartItem').find(filter).sort('product.productName');
                query.exec('find', function (err, result) {
                    if (err) {
                        defer.reject(err.message);
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }

    getById(id) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                db.model('cartItem').findOne({_id: id}, (err, result) => {
                    if (err || !result) {
                        defer.reject('Invalid id!');
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }

    deleteById(id) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                db.model('cartItem').findByIdAndRemove({_id: id}, (err, result) => {
                    if (err || !result) {
                        defer.reject('Invalid id!');
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }
}

module.exports = cartItemMongoDb;