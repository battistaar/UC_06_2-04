const express = require('express');
const router = express.Router();
const bookController = require('./book.controller');

router.get('/:id', bookController.getBook);
router.get('/', bookController.listBooks);
router.post('/', bookController.addBook);

module.exports = router;