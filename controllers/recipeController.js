const Recipe = require('../models/Recipes');
const user = require('../models/User');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Get all the Recipes belong to a login user

module.exports.getRecipes = async (req, res) => {
    try {
      const Recipes = await Recipe.find({ user : req.user.id }).populate("user");
      res.json(Recipes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };


// create  a recipe

  module.exports.createRecipe = async (req, res) => {
    try {
      const { title, description } = req.body;
      const newRecipe = new Recipe({
        recipename: title,
        description,
        user: req.user.id,
      });
      await newRecipe.save();
      res.json(newRecipe);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };


  // delete a recipe 
  
  module.exports.deleteRecipe = async (req, res) => {
    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!deletedRecipe)
        return res.status(404).json({ message: "Recipe not found" });
  
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
 

  // Update a recipe

  module.exports.updateRecipe = async (req, res) => {
    try {
      const { title, description } = req.body;
      const recipeUpdated = await Recipe.findOneAndUpdate(
        { _id: req.params.id },
        { recipename: title, description },
        { new: true }
      );
      return res.json(recipeUpdated);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };



     //Get a specific task of login user

  module.exports.getRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) return res.status(404).json({ message: "recipe not found" });
      return res.json(recipe);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };