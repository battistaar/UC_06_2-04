module.exports.internalError = (err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.send(err.message);
}