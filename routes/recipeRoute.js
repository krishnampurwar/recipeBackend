const { Router } = require('express');
const recipe = require('../controllers/recipeController');
const router = Router();
const auth = require('../middleware/authorization');
var bodyParser = require('body-parser')

router.get("/recipes", auth, recipe.getRecipes);

router.post("/recipes", auth, recipe.createRecipe);

router.get("/recipes/:id", auth, recipe.getRecipe);

router.put("/recipes/:id", auth, recipe.updateRecipe);

router.delete("/recipes/:id", auth, recipe.deleteRecipe);

module.exports = router;