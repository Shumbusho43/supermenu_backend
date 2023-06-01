const mongoose = require('mongoose');
const Joi = require('joi');
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    options: [{
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    totalPrice: {
        type: Number,
        required: true,
    },

}, {
    timestamps: true
});

// Define Joi schema for validation
const orderValidationSchema = Joi.object({
    restaurantId: Joi.string().required(),
    productId: Joi.string().required(),
    options: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().required(),
                quantity: Joi.number().required(),
            })
        )
        .required(),
});

// Validate the order object using Joi
const validateOrder = (order) => {
    return orderValidationSchema.validate(order);
};

module.exports = {
    validateOrder,
};

const Order = mongoose.model('Order', orderSchema);

module.exports.Order = Order;