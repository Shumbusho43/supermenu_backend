const mongoose = require('mongoose');
const Joi = require('joi');

// Define the Menu schema
const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image:{
    type:String,
    required:true
  }
  // Add other fields as per your menu requirements
});

// Define the Joi validation schema for Menu
const menuValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  image: Joi.string().required
  // Add other validations as per your menu requirements
});

// Create the Menu model
const Menu = mongoose.model('Menu', menuSchema);

module.exports = { Menu, menuValidationSchema };
