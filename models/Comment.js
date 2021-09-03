const express = require('express');
const mongoose = require('mongoose');

const commmentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Text is required']
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: [true, 'Recipe is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: [true, 'Created at is required'],
        select: false
    }
});

let Comment;
try {
    Comment = mongoose.model('Comment');
} catch (error) {
    Comment = mongoose.model('Comment', commmentSchema);
}
module.exports = Comment;