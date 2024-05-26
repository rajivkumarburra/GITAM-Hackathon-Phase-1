const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;