const User = require('./user.schema');

module.exports.signUp = (data) => {
    return User.create(data);
}

module.exports.login = (username, password) => {
    return User.findOne({username: username})
        .then(user => {
            if (!user) {
                throw new Error('Invalid username');
            }
            return user.checkPassword(password)
                .then(authenticated => {
                    if (authenticated) {
                        console.log(user.toObject());
                        return user.toObject();
                    } else {
                        throw new Error('Wrong Password');
                    }
                });
        });
}

module.exports.getUser = (id) => {
    return User.findById(id);
}