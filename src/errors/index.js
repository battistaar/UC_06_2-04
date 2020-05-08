const notFound = require('./not-found');
const internal = require('./internal');

module.exports = [notFound.notFoundApi, notFound.notFoundError, internal.internalError];