const Joi = require('joi');
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ingredient: {
    type: [String],
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  optionCoverImage: {
    type: String,
    required: true,
    trim: true,
  },
});

const productSchema = new mongoose.Schema({
  generalName: {
    type: String,
    required: true,
    trim: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  options: {
    type: [optionSchema],
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: 'At least one product option is required.',
    },
  },
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
  const optionSchema = Joi.object({
    name: Joi.string().required(),
    ingredient: Joi.array().required(),
    price: Joi.number().min(0).required(),
    quantity: Joi.number().min(0).required(),
    optionCoverImage: Joi.string().required(),
  });

  const schema = Joi.object({
    generalName: Joi.string().required(),
    restaurantId: Joi.string().required(),
    options: Joi.array().items(optionSchema).min(1).required(),
  });

  return schema.validate(product);
}

module.exports = {
  Product,
  validateProduct
};