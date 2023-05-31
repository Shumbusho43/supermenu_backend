const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const connectToMongoDB = require('./db'); // Assuming you have a separate file for connecting to MongoDB
const userRoutes = require('./user/user.routes');
const {
  restaurantRouter
} = require('./resto/resto.routes');
const {
  product
} = require('./resto/product.routes');
// Create Express app
const app = express();

// Connect to MongoDB
connectToMongoDB(process.env.MONGO_URI);

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// Routes
app.get('/', (req, res) => {
  res.send('WELCOME TO SUPERMENU API');
});
app.use('/user', userRoutes);
app.use("/resto", restaurantRouter);
app.use('/product', product)
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});