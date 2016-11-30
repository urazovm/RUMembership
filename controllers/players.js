var models = require('../models');
var utils = require('./utils');

exports.getAllPlayers = function (res) {
    console.log('in getAllPlayers');
    models.Player.findAll()
        .then(function (players) {
            res.send(JSON.stringify(players));
        });
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

// exports.updateEmail = function (playerID, newEmail, res) {
//     models.Player.find
// }

