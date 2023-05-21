const express = require('express');
const dbconnection = require("./config/db__connection");
const app = express();
const authRoutes = require('./routes/auth');
const recipe = require('./routes/recipeRoute');
var bodyParser = require('body-parser')
require('dotenv').config();
app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
dbconnection();

app.use('/api' , authRoutes);
app.use('/api' , recipe);
app.get('/' , (req,res) => {
    res.send("it's running")
})
const port = process.env.PORT || 8080
app.listen(port , (err) => {
    if(err){
        throw err;
    }else{
        console.log("listining on port 8080")
    }
})