const mongoose = require('mongoose');
const Joi = require('joi');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    coverImage: {
        type: String,
        required: true,
        trim: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
});
//validation
function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().min(0).required(),
        ingredients: Joi.array().items(Joi.string()).required(),
        quantity: Joi.number().min(0).required(),
        coverImage: Joi.string().required(),
        restaurant: Joi.string().required(),
    });
    return schema.validate(product);
}
module.exports.validate = validateProduct;
const Product = mongoose.model('Product', productSchema);

module.exports = Product;