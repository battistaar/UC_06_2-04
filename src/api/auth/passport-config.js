const LocalStrategy = require('passport-local').Strategy;
const authModel = require('./auth.model');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const jwtSecret = 'my_custom_secret';

module.exports.setup = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        authModel.login(username, password)
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                if (err.message === 'Invalid username' || err.message === 'Wrong Password') {
                    return done(null, false, {message: err.message});
                } else {
                    done(err);
                }
            });
    }));

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret
    };

    passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
        authModel.getUser(jwt_payload.data.userId)
            .then(user => {
                return done(null, user.toObject());
            })
            .catch(err => {
                done(err, false);
            });
    }));
}

module.exports.generateJWT = (user) => {
    return jwt.sign({
        maxAge: 60 * 60 * 24,
        data: {
            userId: user._id
        }
    }, jwtSecret);
}