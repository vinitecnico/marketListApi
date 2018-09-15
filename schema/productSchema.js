var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    productName: { type: String, required: true },
    productSize: { type: String, required: true },
    status: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('product', productSchema)