const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL
console.log(MONGO_URL);
// Connect MongoDB at default port 27017.
const dbconnection = async () => {
    try {
      await mongoose.connect(MONGO_URL , {
        useNewUrlParser: true,
        
      });
  
      console.log('MongoDB connected!');
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      process.exit(1);
    }
  };

module.exports = dbconnection;