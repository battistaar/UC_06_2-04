const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: String,
    authors: [String],
    description: {type: String},
    imageLinks: {type: {
        thumbnail: String
    }}
});

module.exports = mongoose.model('Book', BookSchema);