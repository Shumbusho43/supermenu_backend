const {Resto} = require('./resto.model');
const {
    validate
} = require('./resto.model');
//register restaurant
module.exports.register = async (req, res) => {
    const {
        name,
        coverImage
    } = req.body;
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const resto = new Resto({
        name,
        coverImage
    });
    try {
        const result = await resto.save();
        return res.status(201).send(result);
    } catch (ex) {

        res.status(400).send(ex.message);
    }
}
//get all restaurants
module.exports.getAll = async (req, res) => {
    try {
        const result = await Resto.find().populate('products');
        return res.status(200).send(result);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
}
//get restaurant by id
module.exports.getById = async (req, res) => {
    try {
        const result = await Resto.findById(req.params.id).populate('products');
        if (!result) return res.status(404).send('The restaurant with the given ID was not found.');
        return res.status(200).send(result);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
}
//search restaurant by name
module.exports.search = async (req, res) => {
    try {
        const result = await Resto.find({
            name: {
                $regex: req.params.name,
                $options: 'i'
            }
        }).populate('products');
        if (!result) return res.status(404).send('The restaurant with the given name was not found.');
        return res.status(200).send(result);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
}