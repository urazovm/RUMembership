var Promise = require('bluebird');
var models = require('../models');
var utils = require('./utils');

exports = Promise.method(function getAllPlayers3(attribute) {
    // models.Player.findAll()
    //     .then(function (players) {
    //         return players;
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //         throw error;
    //     });
});

exports.getAllPlayers2 = function (callback) {
    //rename once the rest is refactored
    models.Player.findAll()
        .then(function (players) {
            callback(players);
        })
        .catch(function (error) {
            callback(error);
        });
}

exports.getAllPlayers = function (res) {
    console.log('in getAllPlayers');
    models.Player.findAll()
        .then(function (players) {
            res.send(JSON.stringify(players));
        });
}

exports.playerGetMissingValues = function (newPlayer) {
    let missing = [];
    missing = utils.requiredVariable(newPlayer.firstName, "firstName", missing);
    missing = utils.requiredVariable(newPlayer.lastName, "lastName", missing);
    missing = utils.requiredVariable(newPlayer.dob, "dob", missing);
    missing = utils.requiredVariable(newPlayer.gender, "gender", missing);
    missing = utils.requiredVariable(newPlayer.student, "student", missing);
    missing = utils.requiredVariable(newPlayer.emailAddress, "emailAddress", missing);
    missing = utils.requiredVariable(newPlayer.contactNumber, "contactNumber", missing);
    missing = utils.requiredVariable(newPlayer.area, "area", missing);
    missing = utils.requiredVariable(newPlayer.postCode, "postCode", missing);
    let emergencyContacts = newPlayer.emergencyContacts;
    if (emergencyContacts) {
        if (emergencyContacts.length >= 1) {
            for (var i = 0; i < emergencyContacts.length; i++) {
                let emergencyContactName = emergencyContacts[i].name;
                missing = utils.requiredVariable(emergencyContactName, "emergencyContacts[" + i + "].name", missing);
                let emergencyContactNumber = emergencyContacts[i].contactNumber;
                missing = utils.requiredVariable(emergencyContactNumber, "emergencyContacts[" + i + "].contactNumber", missing);
                let emergencyContactRelationship = emergencyContacts[i].relationship;
                missing = utils.requiredVariable(emergencyContactRelationship, "emergencyContacts[" + i + "].relationship", missing);
            }
        }
        else {
            missing.push("at least one emergency contact (name, contactNumber, relationship)");
        }
    }
    else {
        missing.push("at least one emergency contact (name, contactNumber, relationship)");
    }
    return missing;
}

exports.playerHasRequiredValues = function (newPlayer) {
    var missing = this.playerGetMissingValues(newPlayer);
    return missing.length == 0;
}

exports.addNewPlayer = function (playerBody, res) {
    if (!playerBody) {
        return res.send('No player data available');
    }
    let missing = [];
    missing = utils.requiredVariable(playerBody.firstName, "firstName", missing);
    missing = utils.requiredVariable(playerBody.lastName, "lastName", missing);
    missing = utils.requiredVariable(playerBody.dob, "dob", missing);
    missing = utils.requiredVariable(playerBody.gender, "gender", missing);
    missing = utils.requiredVariable(playerBody.student, "student", missing);
    missing = utils.requiredVariable(playerBody.emailAddress, "emailAddress", missing);
    missing = utils.requiredVariable(playerBody.contactNumber, "contactNumber", missing);
    missing = utils.requiredVariable(playerBody.area, "area", missing);
    missing = utils.requiredVariable(playerBody.postCode, "postCode", missing);
    let emergencyContacts = playerBody.emergencyContacts;
    if (emergencyContacts) {
        if (emergencyContacts.length >= 1) {
            for (var i = 0; i < emergencyContacts.length; i++) {
                let emergencyContactName = emergencyContacts[i].name;
                missing = utils.requiredVariable(emergencyContactName, i + " emergencyContact.name", missing);
                let emergencyContactNumber = emergencyContacts[i].contactNumber;
                missing = utils.requiredVariable(emergencyContactNumber, i + " emergencyContact.number", missing);
                let emergencyContactRelationship = emergencyContacts[i].relationship;
                missing = utils.requiredVariable(emergencyContactRelationship, i + " emergencyContact.relationship", missing);
            }
        }
        else {
            missing.push("at least one emergency contact (name, contactNumber, relationship)");
        }
    }
    else {
        missing.push("at least one emergency contact (name, contactNumber, relationship)");
    }

    if (missing.length > 0) {
        return res.send('Missing values for: ' + missing);
    }

    models.Player.create(playerBody)
        .then(function (player) {
            console.log('player built');
            models.EmergencyContact.bulkCreate(emergencyContacts, { returning: true })
                .then(function (contacts) {
                    console.log(JSON.stringify(contacts));
                    player.addEmergencyContact(contacts);

                    res.send("Saved player " + player.fullNameWithNick + " this unique name " + player.uniqueName);
                }).catch(function (error) {
                    console.log(error);
                    res.send(error);
                });
        }).catch(function (error) {
            console.log(error);
            res.send(error);
        });
}

exports.updateEmail = function (playerID, newEmail, res) {
    models.Player.update({
        emailAddress: newEmail
    }, {
            where: {
                id: playerID
            }
        }).then(function (result) {
            console.log(result);
            res.send("Maybe updated player. Not sure yet!");
        });
}

