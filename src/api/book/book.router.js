const express = require('express');
const router = express.Router();
const bookController = require('./book.controller');
const passport = require('passport');

router.get('/:id', passport.authenticate('jwt', { session: false }), bookController.getBook);
router.get('/', passport.authenticate('jwt', { session: false }), bookController.listBooks);
router.post('/', passport.authenticate('jwt', { session: false }), bookController.addBook);

module.exports = router;