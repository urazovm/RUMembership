var Promise = require('bluebird');
var db = require('../models');
var User = db.User;

function getUser(userID) {
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



function registerUser(userAttributes) {
    return new Promise(function (resolve, reject) {

        // userAttributes.provider = 'local';
        // userAttributes.profile_picture = 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg';
        console.log(userAttributes.password);

        User.findOrCreate({
            where: {
                username: userAttributes.username,
                email: userAttributes.email,
                encryptedPassword: User.generateHash(userAttributes.password)
            }
        }).then(function (user, create) {
            if (user) {
                resolve(user);
            } else {
                reject();
            }
        }).catch(function (error) {
            reject(error);
        });
    });
}

module.exports = {
    getUser,
    registerUser
}