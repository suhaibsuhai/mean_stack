const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/item.routes');
const dbConfig = require('./config/db.config');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // to parse JSON data from the body

// Connect to MongoDB
mongoose.connect(dbConfig.url)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Set up routes
app.use('/api/items', itemRoutes);

// Define a simple home route
app.get('/', (req, res) => {
  res.send('Welcome to the MEAN CRUD API!');
});

// Set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
