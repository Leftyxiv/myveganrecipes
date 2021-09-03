const express = require('express');

const authController = require('../controllers/authController');
const recipeController = require('../controllers/recipeController');

const router = express.Router({ mergeParams: true });

// router.use(authController.protect);

router.route('/')
  .get(recipeController.getAllRecipes)
  .post(
    recipeController.setRecipUserId,
    recipeController.createRecipe
  );

router.route('/:id')
  .get(recipeController.getRecipe)
  .patch(
      recipeController.setRecipUserId,
      recipeController.updateRecipe
  )
  .delete(recipeController.deleteRecipe);

module.exports = router;