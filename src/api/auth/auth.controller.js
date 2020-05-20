const authModel = require('./auth.model');
const passport = require('passport');
const passportConfig = require('./passport-config');

module.exports.signup = (req, res, next) => {
    const user = req.body;
    console.log(req.body);
    authModel.signup(user)
        .then(_ => {
            res.status(201);
            res.send();
        })
        .catch(next);
}

module.exports.login = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (user) {
                res.json({
                    status: 'ok',
                    username: user.username,
                    token: passportConfig.generateJWT(user)
                });
            }
            if (info) {
                res.status(401);
                res.json({
                    status: 'error',
                    message: info.message
                });
            }
        })(req, res, next);
}