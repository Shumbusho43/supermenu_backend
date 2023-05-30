const Product = require('../models/product.model');
const Restaurant = require('../models/resto.model');
const {
    validate
} = require('./product.model');
//register product
module.exports.registerProduct = async (req, res) => {
    const {
        name,
        price,
        ingredients,
        quantity,
        coverImage,
        restaurantId
    } = req.body;
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).send('The restaurant with the given ID was not found.');
    const product = new Product({
        name,
        price,
        ingredients,
        quantity,
        coverImage,
        restaurant: restaurantId
    });
    try {
        const result = await product.save();
        return res.status(201).send(result);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
}