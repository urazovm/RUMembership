var Promise = require('bluebird');

getUser = function (userID) {
    return new Promise(function (resolve, reject) {
        return User.findOne({
            where: {
                id: userID
            }
        })
            .then(function (user) {
                console.log(user);
                resolve(user);
                // return truncateUserObject(user);
            }).catch(function (error) {
                console.log(error);
                reject(error);
            });
    });
}

module.exports = {
    getUser
}