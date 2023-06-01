const {
  Product
} = require("../resto/product.model");
const {
  Resto
} = require("../resto/resto.model");
const {
  User
} = require("../user/user.models");
const {
  validateOrder,
  Order
} = require("./order.model");

exports.createOrderController = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      productId,
      restaurantId,
      options
    } = req.body;
    //validate the order
    const {
      error
    } = validateOrder(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }

    //check if restaurant exist,product exist and user exist
    const restaurant = await Resto.findById(restaurantId)
    if (!restaurant) {
      return res.status(400).json({
        error: 'Restaurant not found'
      })
    }
    //check if product exist
    const product = restaurant.products.find((product) => product._id.toString() === productId)
    if (!product) {
      return res.status(400).json({
        error: 'Product not found'
      })
    }
    //getting that product 
    const productData = await Product.findById(productId)
    //check if user exist
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({
        error: 'User not found'
      })
    }
    //check if options exist
    let totalPrice = 0;
    if (options) {
      const optionsExist = productData.options.every((option) => {
        return options.some((item) => item.name === option.name)
      })
      if (!optionsExist) {
        return res.status(400).json({
          error: 'Options not found'
        })
      }
      //calculate the total price
      totalPrice =options.reduce((acc, item) => {
        const option = productData.options.find((option) => option.name === item.name)
        return acc + option.price * item.quantity
      }, 0)
    } else {
      totalPrice = productData.price
    }
    //calculate the total price

    // Create the order
    const order = new Order({
      userId,
      restaurantId,
      productId,
      options,
      totalPrice,
    });

    // Save the order to the database
    await order.save();

    res.status(200).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'Failed to create the order'
    });
  }
};