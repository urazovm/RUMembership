var Promise = require('bluebird');
var utils = require('./utils');
var Player = require('../models').Player;
var EmergencyContact = require('../models').EmergencyContact;

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

/**
     * @param {Object} A JSON player with all required attributes
     * 
     * @returns A list of missing player attributes
     * @returns The created player object
     */
createPlayer = function (newPlayer) {
    return new Promise(function (resolve, reject) {
        return Player.create(newPlayer)
            .then(function (player) {
                console.log('player built');
                EmergencyContact.bulkCreate(emergencyContacts, { returning: true })
                    .then(function (contacts) {
                        console.log(JSON.stringify(contacts));
                        player.addEmergencyContact(contacts);

                        resolve("Saved player " + player.fullNameWithNick + " this unique name " + player.uniqueName);
                    }).catch(function (error) {
                        //  console.log(error);
                        //TODO rollback player!

                        reject(error);
                    });
            }).catch(function (error) {
                console.log('Error creating player');
                if (error.name = 'SequelizeUniqueConstraintError') {
                    reject(new Error('Player ' + newPlayer.firstName + " \"" + newPlayer.fullNameWithNick + "\" " + newPlayer.lastName + " already exists"));
                } else {
                    reject(error);
                }
            });
    });
    //Not for this function to deal with!
    //     if (!this.playerHasRequiredValues(newPlayer)) {
    //         return this.playerGetMissingValues(newPlayer);
    //     }
}

module.exports = {
    getAllPlayers,
    playerGetMissingValues,
    getRequiredValues,
    playerHasRequiredValues,
    createPlayer
}