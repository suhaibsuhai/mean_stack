const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const itemRoutes = require('./routes/item.routes');
const dbConfig = require('./config/db.config');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON data from request bodies

// Connect to MongoDB
mongoose.connect(dbConfig.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Set up API routes for items
app.use('/api/items', itemRoutes);

// Serve static files (frontend) in production
if (process.env.NODE_ENV === 'production') {
  // Serve the static files from the dist directory
  app.use(express.static(path.join(__dirname, 'frontend', 'dist', 'frontend')));

  // Any route that doesn't match the API will return the index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'frontend', 'index.html'));
  });
}

// Define a simple home route
app.get('/', (req, res) => {
  res.send('Welcome to the MEAN CRUD API!');
});

// Set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
