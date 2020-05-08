module.exports.notFoundApi = (req, res) => {
    // TO-DO
}

module.exports.notFoundError = (err, req, res, next) => {
    if (err.message === 'Not Found') {
        // TO-DO
    } else {
        next(err);
    }
}