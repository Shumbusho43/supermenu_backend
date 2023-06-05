const {
  Product,
  validateProduct
} = require('./product.model');
const {
  Resto
} = require('./resto.model');

// Create a new product
exports.registerProduct = async (req, res) => {
  try {
    // Validate the request body
    const {
      error
    } = validateProduct(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    //check if restaurant exists
    const resto = await Resto.findById(req.body.restaurantId);
    if (!resto) return res.status(404).json({
      message: "Restaurant not found"
    })
    //checking if generalName exists
    const generalNameExist = await Product.findOne({
      generalName: req.body.generalName
    })
    if (!generalNameExist) {
      // Create a new product
      const product = new Product(req.body);
      await product.save();
      //update restaurant product array
      await Resto.findByIdAndUpdate({
        _id: req.body.restaurantId
      }, {
        $push: {
          products: product._id
        }
      }, {
        new: true
      })
      // Return the created product
      res.status(201).send(product);
    } else {
      //push only options to the existing product options array
      await Product.findOneAndUpdate({
        generalName: req.body.generalName
      }, {
        $push: {
          options: req.body.options
        }
      }, {
        new: true
      })
      // Return the created product
      res.status(201).send(generalNameExist);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
//get product by id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({
      message: "Product not found"
    })
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}