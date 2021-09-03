const express = require('express');

const Comment = require('../models/comment');
const handlerFactory = require('../controllers/handlerFactory');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/').get(handlerFactory.getAll(Comment)).post(handlerFactory.createOne(Comment));

router.route('/:id')
  .get(handlerFactory.getOne(Comment))
  .patch(handlerFactory.updateOne(Comment))
  .delete(handlerFactory.deleteOne(Comment));

module.exports = router;