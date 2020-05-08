module.exports.getBook = (req, res, next) => {
    next(new Error('Not Found'));
}

module.exports.listBooks = (req, res) => {
    res.json([]);
}

module.exports.addBook = (req, res, next) => {
    res.json({});
}