const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    password: String
});

UserSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        bcrypt.hash(this.password, saltRounds, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        });
    } else {
        next();
    }
});

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);