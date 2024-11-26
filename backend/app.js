const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/item.routes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON data from request bodies

// Connect to MongoDB
mongoose.connect("mongodb://mongodb-mean-stack:g1ScSFXHU0CFPTFC5hlpsS08FUGvCKXI46ggS9H0YFnQEgveNCLL9Go8E9UG8cHzW28IhscpXEGOACDbyBeBSw==@mongodb-mean-stack.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000")
  .then(() => console.log('MongoDB to Azure connected successfully'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Set up API routes for items
app.use('/api/items', itemRoutes);

// Define a simple home route
app.get('/', (req, res) => {
  res.send('Welcome to the MEAN CRUD API v2!');
});

// Set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
