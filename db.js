//generate function for connecting to mongodb
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb+srv://davidshumbusho10:tHwytIt26G7DVv4X@cluster0.utg0kh6.mongodb.net/');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

module.exports = connectToMongoDB;
