var Promise = require('bluebird');
var utils = require('./utils');
var Player = require('../models').Player;

module.exports = {
    getAllPlayers: Promise.method(function() {
        return Player.findAll()
            .then(function (players) {
                console.log(players);
                return players
            }).catch(function (error) {
                console.log(error);
                return error;
            });

    }),
    playerGetMissingValues: function (newPlayer) {
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
    },
    playerHasRequiredValues: function (newPlayer) {
        var missing = this.playerGetMissingValues(newPlayer);
        return missing.length == 0;
    }
}