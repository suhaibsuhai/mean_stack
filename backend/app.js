const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/item.routes');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON data from request bodies

// Determine the environment
const environment = process.env.NODE_ENV || 'development';
console.log(`Running in ${environment} mode`);

// MongoDB connection string
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/meancrud';

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log(`Connected to Azure MongoDB: ${mongoURI}`))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Set up API routes for items
app.use('/api/items', itemRoutes);

// Define a simple home route
app.get('/', (req, res) => {
  res.send('Welcome to the MEAN CRUD API v3!');
});

// Set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
