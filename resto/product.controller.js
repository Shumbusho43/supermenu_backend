const { Product, validateProduct } = require('./product.model');

// Create a new product
exports.registerProduct = async (req, res) => {
  try {
    // Validate the request body
    const { error } = validateProduct(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Create a new product
    const product = new Product(req.body);

    // Save the product to the database
    await product.save();

    // Return the created product
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};