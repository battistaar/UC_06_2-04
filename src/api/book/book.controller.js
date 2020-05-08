const bookModel = require('./book.model');

module.exports.getBook = (req, res, next) => {
    const id = req.params.id;
    bookModel.get(id)
        .then(book => {
            res.json(book);
        })
        .catch(next);
}

module.exports.listBooks = (req, res) => {
    const query = {};
    if (req.query && req.query.author) {
        query.authors = req.query.author;
    }
    bookModel.list(query)
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            next(err);
        });
}

module.exports.addBook = (req, res, next) => {
    console.log(req.body);
    const newBook = {
        title: req.body.title,
        authors: [req.body.author],
        description: req.body.description,
        imageLinks: {
            thumbnail: req.body.thumbnail
        }
    }
    bookModel.add(newBook)
        .then(added => {
            res.json(added);
        })
        .catch(next);
}