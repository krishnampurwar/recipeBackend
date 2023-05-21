const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL
console.log(MONGO_URL);
// Connect MongoDB at default port 27017.
const dbconnection = async() =>{
 try{
    mongoose.connect(MONGO_URL, (err) => {
        if (!err) {
            console.log('MongoDB Connection Succeeded.')
        } else {
            console.log('Error in DB connection: ')
        }
    });
 }
    catch (error) {
        return res.status(500).json({ message: error.message });
      }
 
 
}

module.exports = dbconnection;