const mongoose = require('mongoose');
const Joi = require('joi');
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    coverImage: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true
}); //timestamps: true will automatically add createdAt and updatedAt fields
//validation
function validateRestaurant(restaurant) {
    const schema = Joi.object({
        name: Joi.string().required(),
        coverImage: Joi.string().required(),
    });
    return schema.validate(restaurant);
}
module.exports.validate = validateRestaurant;
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;