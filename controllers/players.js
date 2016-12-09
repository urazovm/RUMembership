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
     * @returns A Promise to return the created player object
     */
createPlayer = function (newPlayer) {
    console.log('in createPlayer');
    //  return sequelize.transaction().then(function (t) {
    //    console.log('in transaction');
    return new Promise(function (resolve, reject) {

        return Player.create(newPlayer, {
            //   include: [EmergencyContact]
        }).then(function (player) {
            console.log('player created!');
            //  for (var i = 0; i < newPlayer.emergencyContacts.length; i++) {
            //    console.log('looping through ' + i);
            EmergencyContact.create({
                name: newPlayer.emergencyContactName,
                contactNumber: newPlayer.emergencyContactNumber,
                relationship: newPlayer.emergencyContactRelationship
            }).then(function (contact) {
                console.log('made contact');

                player.addEmergencyContact(contact);
                // contact.setPlayer(player);

                resolve(player);
            });
            //}
            console.log('getting eCs');
        }).catch(function (error) {
            console.log('in error');
            reject(error);
            //      return t.rollback();
        });
        //  });
    });
}

module.exports = {
    getAllPlayers,
    playerGetMissingValues,
    getRequiredValues,
    playerHasRequiredValues,
    createPlayer
}