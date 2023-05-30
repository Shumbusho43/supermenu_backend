const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const connectToMongoDB = require('./db'); // Assuming you have a separate file for connecting to MongoDB
const userRoutes = require('./user/user.routes');
const {
  restaurantRouter
} = require('./resto/resto.routes');
// Create Express app
const app = express();

// Connect to MongoDB
connectToMongoDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/user', userRoutes);
app.use("/resto", restaurantRouter);
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});