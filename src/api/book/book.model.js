const Book = require('./book.schema');

module.exports.list = () => {
    return Book.find();
}

module.exports.get = (id) => {
    return Book.findById(id);
}

module.exports.add = (bookData) => {
    return Book.create(bookData);
}

module.exports.findByAuthor = (author) => {
    return Book.find({authors: author})
        .then(books => {
            return !books.length ? new Error('Missing Document') : books;
        });
}
