var Promise = require('bluebird');
var utils = require('./utils');
var db = require('../models');
var sequelize = db.sequelize;
var Player = db.Player;
var EmergencyContact = db.EmergencyContact;

playerGetMissingValues = function (newPlayer) {
    let missing = [];
    missing = utils.requiredVariable(newPlayer.firstName, "firstName", missing);
    missing = utils.requiredVariable(newPlayer.nickName, "nickName cannot be null, but can be empty", missing);
    missing = utils.requiredVariable(newPlayer.lastName, "lastName", missing);
    missing = utils.requiredVariable(newPlayer.dob, "dob", missing);
    missing = utils.requiredVariable(newPlayer.gender, "gender", missing);
    missing = utils.requiredVariable(newPlayer.student, "student", missing);
    missing = utils.requiredVariable(newPlayer.emailAddress, "emailAddress", missing);
    missing = utils.requiredVariable(newPlayer.contactNumber, "contactNumber", missing);
    missing = utils.requiredVariable(newPlayer.area, "area", missing);
    missing = utils.requiredVariable(newPlayer.postCode, "postCode", missing);
    let emergencyContact = newPlayer.emergencyContact;
    if (emergencyContact) {
        missing = utils.requiredVariable(emergencyContact.name, "emergencyContact.name", missing);
        missing = utils.requiredVariable(emergencyContact.contactNumber, "emergencyContact.contactNumber", missing);
        missing = utils.requiredVariable(emergencyContact.relationship, "emergencyContact.relationship", missing);
    }
    else {
        missing.push("emergency contact (name, contactNumber, relationship)");
    }
    return missing;
}

getRequiredValues = function () {
    return playerGetMissingValues({});
}

playerHasRequiredValues = function (newPlayer) {
    var missing = this.playerGetMissingValues(newPlayer);
    return missing.length == 0;
}

getAllPlayers = function () {
    return new Promise(function (resolve, reject) {
        return Player.findAll()
            .then(function (players) {
                //  console.log(players);
                resolve(players);
            }).catch(function (error) {
                // console.log(error);
                reject(error);
            });
    });
}

getPlayer = function (playerID) {
    return new Promise(function (resolve, reject) {
        return Player.find({
            where: {
                id: playerID
            }
        }).then(function (player) {
            resolve(player);
        }).catch(function (error) {
            reject(error);
        });
    });
}

addEmergencyContactToPlayer = function (player, emergencyContactData) {
    //where player is a sequelize instance of Player
    return new Promise(function (resolve, reject) {
        EmergencyContact.create(emergencyContactData).then(function (contact) {
            player.addEmergencyContact(contact);
            resolve(player);
        }).catch(function (error) {
            reject(error);
        });
    });
}

addEmergencyContactToPlayerByID = function (playerID, emergencyContactData) {
    return new Promise(function (resolve, reject) {
        getPlayer(playerID).then(function (player) {
            addEmergencyContactToPlayer(player, emergencyContactData).then(function (player) {
                resolve(player);
            }).catch(function (error) {
                reject(error);
            });
        });
    });
}

createPlayerWithEmergencyContact = function (newPlayer, newEC) {
    return new Promise(function (resolve, reject) {
        return Player.create(newPlayer).then(function (player) {
            addEmergencyContactToPlayer(player, newEC).then(function (player) {
                resolve(player);
            });
        }).catch(function (error) {
            reject(error);
        });
    });
}


createJustPlayer = function (newPlayer) {
    return new Promise(function (resolve, reject) {
        return Player.create(newPlayer).then(function (player) {
            resolve(player);
        }).catch(function (error) {
            reject(error);
        });
    });
}

/**
     * @param {Object} A JSON player with all required attributes. One Emergency Contact is included with details at the Player level
     * 
     * @returns A Promise to return the created player object
     */
createPlayer = function (newPlayerAndEC) {
    return new Promise(function (resolve, reject) {
        createPlayerWithEmergencyContact(newPlayerAndEC, newPlayerAndEC.emergencyContact).then(function (player) {
            resolve(player);
        }).catch(function (error) {
            reject(error);
        });
    });
}

updatePlayerMinorInfo = function (newPlayer) {
    return new Promise(function (resolve, reject) {
        Player.findById(newPlayer.id)
            .then(function (player) {

                player.update({
                    nickName: newPlayer.nickName,
                    ukuName: newPlayer.ukuName,
                    wfdfID: newPlayer.wfdfID,
                    medicalInfo: newPlayer.medicalInfo
                }).then(function (updatedPlayer) {
                    resolve({ 'message': 'Successfully updated minor player info', 'player': updatedPlayer.get() });
                });
            }).catch(function (error) {
                reject(error);
            })
    });
}

updateUKUUsername = function (playerID, newUsername) {
    return new Promise(function (resolve, reject) {
        Player.findById(playerID)
            .then(function (player) {
                player.update({
                    ukuName: newUsername
                }).then(function () {
                    resolve();
                });
            }).catch(function (error) {
                reject(error);
            })
    });
}

// addEmergencyContact = function (playerID, emergencyContact) {
//     return new Promise(function (resolve, reject) {
//         Player.find({
//             where: {
//                 id: playerID
//             }
//         })
//     });
// }

module.exports = {
    getAllPlayers,
    getPlayer,
    playerGetMissingValues,
    getRequiredValues,
    playerHasRequiredValues,
    createPlayer,
    addEmergencyContactToPlayer,
    addEmergencyContactToPlayerByID,
    updatePlayerMinorInfo
}