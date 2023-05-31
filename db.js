//generate function for connecting to mongodb
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
async function connectToMongoDB(MONGO_URI) {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

module.exports = connectToMongoDB;
