require('dotenv').config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,  // Load MongoDB URI from .env file
};
