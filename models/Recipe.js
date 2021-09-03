const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients is required'],
    },
    directions: {
        type: String,
        required: [true, 'Directions is required'],
    },
    image: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cookTime: {
        type: String,
        required: [true, 'Cook time is required'],
    }
});

let Recipe;
try {
  Recipe = mongoose.model('recipes')
} catch (error) {
  Recipe = mongoose.model('recipes', recipeSchema)
}

module.exports = Recipe;
