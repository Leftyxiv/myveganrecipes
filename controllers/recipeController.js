const Recipe = require('../models/recipe');
const handlerFactory = require('./handlerFactory');

exports.getAllRecipes = handlerFactory.getAll(Recipe);
exports.getRecipe = handlerFactory.getOne(Recipe);
exports.createRecipe = handlerFactory.createOne(Recipe);
exports.updateRecipe = handlerFactory.updateOne(Recipe);
exports.deleteRecipe = handlerFactory.deleteOne(Recipe);

exports.setRecipUserId = (req, res, next) => {
    if (!req.body.recipe) req.body.recipe = req.params.id;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};