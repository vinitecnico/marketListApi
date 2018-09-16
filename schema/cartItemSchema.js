var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartItemSchema = new Schema({
    product: {
        _id: { type: String, required: true },
        productName: { type: String, required: true },
        productSize: { type: String},
        imageURL: { type: String},
        status: Boolean,
    },
    quantity: { type: Number, min: 1, max: 99, required: true },
    price: { type: Number },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('cartItem', cartItemSchema)