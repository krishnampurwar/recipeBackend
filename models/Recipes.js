 const mongoose = require('mongoose');
 
 const Schema = mongoose.Schema
 const RecipeSchema = new Schema({
    recipename: {
        type : String,
        required: [true , "please provide the Recipe name"]
    },
    description:{
        type : String
    },
    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "user",
       required: [true , "please provide the user"]
    },
    date:{
        type:Date,
        default:Date.now
    }
 })
 module.exports = Recipes = mongoose.model("recipe" , RecipeSchema);