'use strict';
const mongodb = require('./mongoDb');
const Q = require('q');
const moment = require('moment');
const productSchema = require('../schema/productSchema');

class productMongoDb {

    constructor() { }

    insert(product) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                product.created_at = new moment().toDate();
                product.updated_at = new moment().toDate();

                var productDb = new productSchema(product);
                productDb.save(function (error, result) {
                    if (error) {
                        defer.reject(error.message);
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }

    update(id, product) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                const newData = {
                    productName: product.productName,
                    productSize: product.productSize,
                    updated_at: new moment().toDate()
                };

                db.model('product').findOneAndUpdate({ _id: id }, newData, { upsert: true }, function (err, result) {
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
                var query = db.model('product').find(filter).sort('productName');
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
                db.model('product').findOne({_id: id}, (err, result) => {
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
                db.model('product').findByIdAndRemove({_id: id}, (err, result) => {
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

module.exports = productMongoDb;